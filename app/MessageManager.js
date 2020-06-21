'use-strict';
const Discord = require('discord.js');
const Game = require('./Game');
const PackageInfo = require('../package.json');
const Embeds = require('../embeds');
const Filters = require('../filters');
const Collectors = require('../collectors');

class MessageManager {
    /**
     * Adds the appropriate server rich-embed message + reactions for the game state.
     * @param {Game} game The game on which the reactions should be added to. 
     * @param {string} type The state of the game.
     * @returns {Promise<Discord.MessageEmbed>}
     */
    static async sendServerMessage(game, type) {
        const embed = Embeds[type](game)

        if (type === 'CHANGE_HOST' || type === 'LEADERBOARD') {
            game.last_message = await game.channel.send(embed);
        } else {
            await this.post(game, embed);
        }
        await this.addReactions(game, type);
        return embed;
    }

    /**
     * Collects the reactions on the game's last message based on the game state.
     * @param {Game} game The game on which the reactions should be added to. 
     * @param {string} type The state of the game.
     * @returns {Promise<int>} Number of collected responses before quitting.
     */
    static async collect(game, type) {
        const vote_time = game.profile.vote_time * 1000;
        const register_max = game.profile.max_players;
        const timeout = {
            'REGISTRATION': 300000,             // 5 Minutes
            'MATCH_END': 600000,                // 10 Minutes
            'VOTE': vote_time,                  // Variable (Default = 30 seconds)
            'MAFIA': 300000,                    // 5 Minutes
            'CHANGE_HOST': 300000               // 5 Minutes
        };
        const max = {
            'REGISTRATION': register_max,       // Variable (Default = 8)
            'MATCH_END': 1,                     // 1 -> Host Player
            'VOTE': game.players.length,        // Number of players registered in the game
            'MAFIA': 1,                         // 1 -> Host Player
            'CHANGE_HOST': 1                    // 1 -> Host Player
        };
        const filter = Filters[type](game);
        const collector = game.last_message.createReactionCollector(filter, {time: timeout[type], max: max[type]});
        Collectors[type](collector, game);
    }

    /**
     * Sends the rich-embed message to the server and replaces the previous game message.
     * @param {Game} game The game on which the reactions should be added to.
     * @param {Discord.MessageEmbed} embed The Discord rich-embed to send to the server.
     * @returns {Promise<Discord.MessageEmbed>} 
     */
    static async post(game, message) {
        if (game.last_message) {
            game.last_message.delete();
        }
        game.last_message = await game.channel.send(message);
        return game.last_message;
    }

    /**
     * Adds the appropriate reactions to the current game message.
     * @param {Game} game The game on which the reactions should be added to.
     * @param {string} type The state of the game.
     * @returns {Promise<[...string]>}
     */
    static async addReactions(game, type) {
        let emojis = [];

        // Find appropriate emojis for each type of message.
        switch (type) {
            case 'REGISTRATION':
                emojis = ['✅', '❌', '▶'];
                break;
            case 'GAMEBOARD':
                emojis = ['▶', '🔀'];
                break;
            case 'MATCH_END':
                emojis = ['🔵', '🟠'];
                break;
            case 'VOTE':
                emojis = num_emojis.slice(0, game.players.length);
                break;
            case 'MAFIA':
                emojis = ['🔁', '⏹'];
                break;
            case 'CHANGE_HOST':
                emojis = num_emojis.slice(0, game.players.length);
                break;
        }

        // Add each appropriate emoji to the last game message (IN ORDER)
        emojis.forEach(async (emoji) => {
            try {
                game.last_message.react(emoji);
            } catch (err) {
                console.error(err);
            }
        });

        return emojis;
    }

    static sortPlayers(game) {
        let playersCopy = [...game.players];
        // playersCopy.sort((a, b) => (a.score > b.score) ? 1 : (a.score === b.score) ?
        //     a.tag.localeCompare(b.tag) : -1 );
        playersCopy.sort((a, b) => (a.score === b.score) ? a.tag.localeCompare(b.tag) : (b.score - a.score));
        return playersCopy
    }

    static formatPlayers(game, type) {
        let sorted_players = this.sortPlayers(game);
        let formatted_players = '';
        let formatted_score = '';
        switch (type) {
            case 'LEADERBOARD':
                let last_val = -1;
                let last_pos = 0;
                for (let i = 0; i < sorted_players.length; i++) {
                    let player = sorted_players[i];
                    if (player.score !== last_val) {
                        last_pos = i;
                        last_val = player.score;
                    }
                    formatted_players += `${num_emojis[last_pos]} ${player.username}\n`;
                    formatted_score += `${player.score}\n`;
                }
                break;
            default:
                for (let i = 0; i < sorted_players.length; i++) {
                    let player = sorted_players[i];
                    formatted_players += `${num_emojis[i]} ${player.username}\n`;
                    formatted_score += `${player.score}\n`;
                }
                break;
        }
        if (formatted_players === '') formatted_players = 'No Players';
        if (formatted_score === '') formatted_score = 'No Score';

        return [formatted_players, formatted_score];
    }

    static sendDMs(game) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${game.host.username}'s ⚽ Rocket League Mafia Game ⚽`)
            .setFooter(`Powered by Rocket League Mafia Bot v${PackageInfo.version}`, game.host.avatar);
        const villager_embed = new Discord.MessageEmbed(embed)
            .setColor('#008000')
            .setTitle('Villager');
        const mafia_embed = new Discord.MessageEmbed(embed)
            .setColor('#800000')
            .setTitle('Mafia');

        game.villagers.forEach(player => {
            player.dm_channel.send(villager_embed);
        });
        game.mafia.forEach(player => {
            player.dm_channel.send(mafia_embed);
        });
    }
}

module.exports = MessageManager;