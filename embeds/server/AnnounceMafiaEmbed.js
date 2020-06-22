const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    let confirmed_mafia = '';
    game.mafia.forEach(player => {
        confirmed_mafia += `${player.username}\n`;
    });
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .setDescription('Announcing the mafia players for last game!\nDid you guess correctly?')
        .addField('Mafia', `${confirmed_mafia}`);
};