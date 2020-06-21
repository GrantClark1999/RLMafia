`use strict`;

const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    return BaseEmbed(game)
        .setColor('#008000')    // Green
        .setTitle(`Game ${game.match_num}`)
        .addField('Role', 'Villager');
}