'use-strict';
const Discord = require('discord.js');
const Game = require('./Game');
const PackageInfo = require('../package.json');

const num_emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

class MessageManager {
    /**
     * Adds the appropriate server rich-embed message + reactions for the game state.
     * @param {Game} game The game on which the reactions should be added to. 
     * @param {string} type The state of the game.
     * @returns {Promise<Discord.MessageEmbed>}
     */
    static async sendServerMessage(game, type) {
        // Base embed with any global information that will be displayed on EACH embed sent to the server.
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${game.host.username}'s ⚽ Rocket League Mafia Game ⚽`)
            .setColor('#fccffc')
            .setFooter(`Powered by Rocket League Mafia Bot v${PackageInfo.version}`, game.host.avatar);
        
        // Add appropriate embed fields depending on the type of message that needs to be sent.
        let formatted = [];
        switch (type) {
            case 'REGISTRATION':
                embed.setTitle(`React  ✅  To Join!`)
                    .setDescription(`${game.host.user} start the game when ready.\n\nGame will automatically end in 5 minutes if game has not started.`)
                    .addFields(
                        { name: 'Reactions', value: '✅\n❌\n▶', inline: true},
                        { name: 'Action', value: 'Join\nLeave\nStart', inline: true}
                    )
                break;
            case 'GAMEBOARD':
                let teams = game.getTeams();
                let blue_team = teams[0];
                let orange_team = teams[1];
                embed.setTitle(`Game ${game.match_num}`)
                    .addFields(
                        { name: 'Blue Team', value: `${blue_team}`, inline: true },
                        { name: 'Orange Team', value: `${orange_team}`, inline: true }
                    );
                break;
            case 'MATCH_END':
                embed.setTitle(`Game ${game.match_num}`)
                    .setDescription(`Which Team Won, ${game.host.username}?\nGame will automatically end in 5 minutes if no reaction is given.`);
                break;
            case 'VOTE':
                let vote_players = '';
                for (let i = 0; i < game.players.length; i++) {
                    vote_players += `${num_emojis[i]} ${game.players[i].username}\n`;
                }
                embed.setTitle(`Game ${game.match_num}`)
                    .addField('Players', `${vote_players}`);
                break;
            case 'MAFIA':
                let confirmed_mafia = '';
                game.mafia.forEach(mafia_player => {
                    confirmed_mafia += `${mafia_player.username}\n`;
                });
                embed.setTitle(`Game ${game.match_num}`)
                    .addField('Mafia', `${confirmed_mafia}`);
                break;
            case 'LEADERBOARD':
                formatted = this.formatPlayers(game, type);
                embed.setTitle(`Games Played\n${game.match_num}`)
                    .addFields(
                        { name: 'Player', value: `${formatted[0]}`, inline: true },
                        { name: 'Score', value: `${formatted[1]}`, inline: true}
                    );
                break;
            case 'CHANGE_HOST':
                formatted = this.formatPlayers(game, type);
                embed.setTitle(`Game ${game.match_num}`)
                    .addField('Player', formatted[0]);
                break;
        }

        if (type === 'CHANGE_HOST') {
            game.last_message = await game.channel.send(embed);
        } else {
            await this.post(game, embed);
        }

        await this.addReactions(game, type);

        console.debug(`Resolved promise for ${type}`);

        return embed;
    }

    /**
     * Collects the reactions on the game's last message based on the game state.
     * @param {Game} game The game on which the reactions should be added to. 
     * @param {string} type The state of the game.
     * @returns {Promise<int>} Number of collected responses before quitting.
     */
    static async collect(game, type) {
        const filter = this.matchFilter(game, type);
        const vote_time = game.profile.vote_time * 1000;
        const register_max = game.profile.max_players;
        const timeout = {
            'REGISTRATION': 300000,             // 5 Minutes
            'MATCH_END': 300000,                // 5 Minutes
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
        console.debug(`Creating ${type} collector`);
        const collector = game.last_message.createReactionCollector(filter, {time: timeout[type], max: max[type]});
        switch (type) {
            case 'REGISTRATION':
                collector.on('collect', async (reaction, user) => {
                    if (reaction.emoji.name === '▶') {
                        game.start();
                        return true;
                    } else if (reaction.emoji.name === '✅') {
                        game.join(user);
                    } else if (reaction.emoji.name === '❌') {
                        game.leave(user);
                    }
                });
                collector.on('end', (collected, reason) => {
                    if (game.status.toUpperCase() === type && reason !== 'messageDelete') {
                        console.debug(`Ending game after ${collected.size} collections from ${type} due to ${reason}`);
                        game.end();
                    }
                    return false;
                });
                break;
            case 'GAMEBOARD':
                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '▶') 
                        game.matchEnd();
                    else if (reaction.emoji.name === '🔀')
                        game.register();
                    else 
                        return false;
                    return true;
                });
                collector.on('end', (collected, reason) => {
                    let has_collected = (collected.size !== 0);
                    if (!has_collected && reason !== 'messageDelete') {
                        console.debug(`Ending game after ${collected.size} collections from ${type} due to ${reason}`);
                        game.end();
                    }
                    return has_collected;
                });
                break;
            case 'MATCH_END':
                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '🔵') {
                        game.match_winner = 0;
                    } else {
                        game.match_winner = 1;
                    }
                    game.vote();
                    return true;
                });
                collector.on('end', (collected, reason) => {
                    let has_collected = (collected.size !== 0);
                    if (!has_collected && reason !== 'messageDelete') {
                        console.debug(`Ending game after ${collected.size} collections from ${type} due to ${reason}`);
                        game.end();
                    }
                    return has_collected;
                });
                break;
            case 'VOTE':
                collector.on('collect', (reaction, user) => {
                    let index = num_emojis.indexOf(reaction.emoji.name);
                    game.players[index].votes_against++;
                });
                collector.on('end', () => {
                    game.assignPoints();
                    game.announceMafia();
                    return true;
                });
                break;
            case 'MAFIA':
                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '🔁') {
                        game.showGameboard();
                    } else if (reaction.emoji.name === '⏹') {
                        console.debug('Game ended by Host');
                        game.end();
                    } else {
                        return false;
                    }
                    return true;
                });
                break;
            case 'CHANGE_HOST':
                collector.on('collect', (reaction, user) => {
                    let index = num_emojis.indexOf(reaction.emoji.name);
                    game.host = game.players[index];
                });
                collector.on('end', (collected, reason) => {
                    let has_collected = (collected.size !== 0);
                    if (!has_collected && reason !== 'messageDelete') {
                        console.debug(`Ending game after ${collected.size} collections from ${type} due to ${reason}`);
                        game.end();
                    }
                    return has_collected;
                });
        }
    }

    /**
     * Sends the rich-embed message to the server and replaces the previous game message.
     * @param {Game} game The game on which the reactions should be added to.
     * @param {Discord.MessageEmbed} embed The Discord rich-embed to send to the server.
     * @returns {Promise<Discord.MessageEmbed>} 
     */
    static async post(game, message) {
        if (game.last_message) {
            console.debug('Deleting old message');
            game.last_message.delete();
        }
        console.debug('Sending new message');
        game.last_message = await game.channel.send(message);
        console.debug('Sent new message');
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

        console.debug('Adding reactions')

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
                    console.debug(`Sent emoji: ${emoji}`);
                } catch (err) {
                    console.error(err);
                }
            });

        console.debug('Added reactions');

        return emojis;
    }

    static matchFilter(game, type) {
        let filter;
        switch (type) {
            case 'REGISTRATION':
                console.debug('Creating REGISTRATION filter')
                filter = (reaction, user) => {
                    if (game.last_message.author.id === user.id)
                        return false;
                    if (game.host.tag === user.tag && reaction.emoji.name === '▶')
                        return true;
                    return ['✅', '❌'].includes(reaction.emoji.name);
                };
                break;
            case 'GAMEBOARD':
                filter = (reaction, user) => {
                    return ['▶', '🔀'].includes(reaction.emoji.name) && user.tag === game.host.tag;
                };
                break;
            case 'MATCH_END':
                filter = (reaction, user) => {
                    if (game.last_message.author.id === user.id)
                        return false;
                    return (['🔵', '🟠'].includes(reaction.emoji.name) && user.tag === game.host.tag);
                };
                break;
            case 'VOTE':
                filter = (reaction, user) => {
                    if (game.last_message.author.id === user.id)
                        return false;
                    let valid_reaction = false;
                    let found_player = game.find(user);
                    if (found_player === null) {
                        reaction.users.remove(user.id);
                    } else {
                        found_player.has_voted = true;
                        valid_reaction = num_emojis.includes(reaction.emoji.name);
                    }
                    return valid_reaction;
                };
                break;
            case 'MAFIA':
                filter = (reaction, user) => {
                    if (game.last_message.author.id === user.id)
                        return false;
                    return (['🔁', '⏹'].includes(reaction.emoji.name) && user.tag === game.host.tag);
                }
                break;
            case 'CHANGE_HOST':
                filter = (reaction, user) => {
                    if (game.last_message.author.id === user.id)
                        return false;
                    return (num_emojis.includes(reaction.emoji.name) && user.tag === game.host.tag);
                }
        }
        return filter;
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
}

module.exports = MessageManager;