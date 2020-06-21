const BaseEmbed = require('./BaseEmbed');
const MessageManager = require('../app/MessageManager');

module.exports = (game) => {
    formatted = MessageManager.formatPlayers(game, 'CHANGE_HOST');
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .addField('Player', formatted[0]);
};