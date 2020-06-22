`use strict`;

const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    return BaseEmbed(game)
        .setColor('#008000')    // Green
        .setTitle(`Game ${game.match_num}`)
        .addFields(
            {name: 'Role', value: 'Villager'},
            {name: 'Goal', value: 'Try to win the game and find out who is trying to throw (lose) the game as Mafia!'}
        )
        .setImage('https://pbs.twimg.com/profile_images/1106479170501128192/i9R_ajXN_400x400.png');
}