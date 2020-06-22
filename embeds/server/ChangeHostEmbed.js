const BaseEmbed = require('../BaseEmbed');
const Format = require('../Format');

module.exports = (game) => {
    formatted = Format.formatPlayers(game, 'CHANGE_HOST');
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .addField('Player', formatted[0]);
};