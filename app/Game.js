'use-strict';
const config = require('../config.json');
const Discord = require('discord.js');
const MessageManager = require('./MessageManager');
const PackageInfo = require('../package.json');
const Player = require('./Player');
const Bot = require('../bot');
const { Error } = require('../errors');

const num_emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

class Game {
    constructor(message) {
        this.players = [];

        this.villagers = [];
        this.mafia = [];

        this.profile = {
            max_players: 8,
            num_mafia: 1,
            vote_time: 30
        }

        this.status = 'Registration';
        this.match_num = 0;
        this.match_winner;

        this.channel = message.channel;
        this.last_message = message;
    }

    async initialize() {
        try {
            this.host = await Player.create(this.last_message.author, this);
            this.host.game = this;
            this.players.push(this.host);
            this.register();
        } catch (err) {
            console.error(err.message);
            if (err instanceof Error)
                this.last_message.channel.send(err.message);
            this.last_message.delete();
            this.end();
            return;
        }
    }

    static async create(message) {
        const o = new Game(message);
        await o.initialize();
        return o;
    }

    register() {
        MessageManager.sendServerMessage(this, 'REGISTRATION')
            .then(() => MessageManager.collect(this, 'REGISTRATION'));
    }

    showGameboard() {
        MessageManager.sendServerMessage(this, 'GAMEBOARD')
            .then(() => MessageManager.collect(this, 'GAMEBOARD'));
    }

    start() {
        this.resetPlayers();
        this.match_num++;
        this.assignMafia();
        this.assignTeams();
        this.showGameboard();
    }
    
    matchEnd() {
        MessageManager.sendServerMessage(this, 'MATCH_END')
            .then(() => MessageManager.collect(this, 'MATCH_END'));
    }

    vote() {
        MessageManager.sendServerMessage(this, 'VOTE')
            .then(() => MessageManager.collect(this, 'VOTE'));
    }

    announceMafia() {
        MessageManager.sendServerMessage(this, 'MAFIA')
            .then(() => MessageManager.collect(this, 'MAFIA'));
    }

    showLeaderboard() {
        MessageManager.sendServerMessage(this, 'LEADERBOARD');
    }

    end() {
        if (this.match_num > 0)
            this.showLeaderboard();
        this.players.forEach(player => {
            games.delete(player.tag);
        });
        this.last_message.delete();
    }

    join(user) {
        if (this.players.length >= this.profile.max_players) {
            this.removeReactions(user, this.last_message);
            throw new Error('GAME_IS_FULL');
        }
        if (this.find(user) === null) {
            Player.create(user, this).then(new_player => {
                this.players.push(new_player);
                return true;
            }).catch(err => {
                console.error(err.message);
                if (err instanceof Error)
                    this.channel.send(err.message);
                this.removeReactions(user, this.last_message);
                return false;
            });
        }
    }

    leave(user) {
        let player = this.find(user);
        if (player !== null) {
            let index = this.players.indexOf(player);
            if (index !== -1) {
                if (this.host === player) {
                    if (this.players.length > 1) {
                        this.players.splice(index, 1);
                        MessageManager.sendServerMessage(this, 'CHANGE_HOST')
                            .then(() => MessageManager.collect(this, 'CHANGE_HOST'));
                    } else {
                        // Don't remove player from this.players, else single player will not be showed on leaderboard.
                        console.debug('before end')
                        this.end();
                        console.debug('after end')
                    }
                } else {
                    this.players.splice(index, 1);
                }
            }
        }
        this.removeReactions(user, this.last_message);
    }

    removeReactions(user, message) {
        const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
        try {
            for (const reaction of userReactions.values()) {
                reaction.users.remove(user.id);
            }
        } catch (err) {
            console.error(`Failed to remove reactions from ${user.id}`);
        }
    }

    resetPlayers() {
        this.players.forEach(player => {
            player.team = 0;
            player.has_voted = false;
            player.votes_against = 0;
            player.is_dead = false;
        });
    }

    assignMafia() {
        this.mafia = [];
        this.villagers = [...this.players];

        for (let i = 0; i < this.profile.num_mafia; i++) {
            let index = Math.floor(Math.random() * this.villagers.length);
            let mafia_player = this.villagers[index];
            this.mafia.push(mafia_player);
            this.villagers.splice(index, 1);
        }
    }

    assignTeams() {
        let num_players = this.players.length;
        let num_assigned = 0;
        while (num_assigned < Math.floor(num_players/2)) {
            let random_index = Math.floor(Math.random() * num_players);
            if (this.players[random_index].team !== 1) {
                this.players[random_index].team = 1;
                num_assigned++;
            }
        }
    }

    assignPoints() {
        this.mafia.forEach(mafia_player => {
            if (mafia_player.votes_against >= Math.ceil((this.players.length+1)/2))
                mafia_player.is_dead = true;
        
            let index = this.players.indexOf(mafia_player);
            if (index !== -1) {
                let users = this.last_message.reactions.cache.get(num_emojis[index]).users.cache;

                users.forEach(user => {
                    let player = this.find(user);
                    if (player !== null && !this.mafia.includes(player)) {
                        player.score += config.points.villager.guessedMafia;
                        if (mafia_player.is_dead) {
                            player.score += config.points.villager.killedMafia;
                        }
                    }
                });
            }
        });

        this.villagers.forEach(villager_player => {
            if (villager_player.team == this.match_winner)
                villager_player.score += config.points.villager.teamWon;
        });

        this.mafia.forEach(mafia_player => {
            if (mafia_player.team != this.match_winner)
                mafia_player.score += config.points.mafia.teamLost;
            else
                mafia_player.score += config.points.mafia.teamWon;

            if (!mafia_player.is_dead)
                mafia_player.score += config.points.mafia.notKilled;
            
            if (mafia_player.votes_against === 0)
                mafia_player.score += config.points.mafia.noVotesAgainst;
        });
    }

    getTeams() {
        let blue_team = '';
        let orange_team = '';

        this.players.forEach(player => {
            if (player.team === 0) 
                blue_team += `${player.username}\n`;
            else
                orange_team += `${player.username}\n`;
        });

        if (blue_team === '') blue_team = 'No Players';
        if (orange_team === '') orange_team = 'No Players';

        return [blue_team, orange_team];
    }

    find(user) {
        let found_player = null;
        this.players.forEach(player => {
            if (player.tag === user.tag) {
                found_player = player;
            }
        });
        return found_player;
    }
}

module.exports = Game;