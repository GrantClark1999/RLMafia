const BaseEmbed = require('../BaseEmbed');
const Format = require('../Format');

module.exports = (game) => {
    formatted = Format.formatPlayers(game, 'CHANGE_HOST');
    return BaseEmbed(game)
        .setTitle('Select a player to make the host')
        .addFields(
            { name: 'Player', value: formatted[0]}
        );
};