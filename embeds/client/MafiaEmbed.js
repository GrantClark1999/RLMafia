'use strict';

const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    return BaseEmbed(game)
        .setColor('#800000')    // Red
        .setTitle(`Game ${game.match_num}`)
        .addField('Role', 'Mafia');
}