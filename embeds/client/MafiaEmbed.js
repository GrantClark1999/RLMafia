'use strict';

const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    return BaseEmbed(game)
        .setColor('#800000')    // Red
        .setTitle(`Game ${game.match_num}`)
        .addFields(
            {name: 'Role', value: 'Mafia'},
            {name: 'Goal', value: 'Try to throw (lose) the game without being caught as Mafia!'}
        )
        .setImage('https://i.imgur.com/6WTxTmZ.jpg'); // Mafia
}