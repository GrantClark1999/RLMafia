const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    let confirmed_mafia = '';
    game.mafia.forEach(player => {
        confirmed_mafia += `${player.username}\n`;
    });
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .addField('Mafia', `${confirmed_mafia}`);
};