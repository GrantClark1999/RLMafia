'use-strict';
const Discord = require('discord.js');
const Game = require('./Game');
const PackageInfo = require('../package.json');
const { ServerEmbeds, ClientEmbeds } = require('../embeds');
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
        const embed = ServerEmbeds[type](game)

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
        const collector = game.last_message.createReactionCollector(filter, {time: timeout[type], max: max[type], dispose: true});
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
        let emojis = {
            'REGISTRATION': ['✅', '❌', '🟢', '▶'],
            'GAMEBOARD': ['◀',  '🔀', '▶'],
            'MATCH_END': ['🔵', '🟠'],
            'VOTE': num_emojis.slice(0, game.players.length),
            'MAFIA': ['🔁', '⏹'],
            'CHANGE_HOST': num_emojis.slice(0, game.players.length),
            'LEADERBOARD': []
        };

        // Add each appropriate emoji to the last game message (IN ORDER)
        emojis[type].forEach(async (emoji) => {
            try {
                await game.last_message.react(emoji);
            } catch (err) {
                console.error(`Failed to add ${emoji} reaction to ${type} message.`);
                console.error(err);
            }
        });

        return emojis;
    }

    static sendDMs(game) {
        game.villagers.forEach(player => {
            player.dm_channel.send(ClientEmbeds.VillagerEmbed(game));
        });
        game.mafia.forEach(player => {
            player.dm_channel.send(ClientEmbeds.MafiaEmbed(game));
        });
    }
}

module.exports = MessageManager;