const BaseEmbed = require('./BaseEmbed');
const MessageManager = require('../app/MessageManager');

module.exports = (game) => {
    formatted = MessageManager.formatPlayers(game, 'LEADERBOARD');
    return BaseEmbed(game)
        .setTitle(`Games Played\n${game.match_num}`)
        .addFields(
            { name: 'Player', value: `${formatted[0]}`, inline: true },
            { name: 'Score', value: `${formatted[1]}`, inline: true}
        );
};