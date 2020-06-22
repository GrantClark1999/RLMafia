const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    let confirmed_mafia = '';
    game.mafia.forEach(player => {
        confirmed_mafia += `${player.username}\n`;
    });
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .setDescription('Announcing the mafia players for last game!\nDid you guess correctly?')
        .addFields(
            { name: 'Mafia', value: `${confirmed_mafia}` },
            { name: 'Reactions', value: '🔁\n⏹', inline: true},
            { name: 'Actions', value: 'New RL Match\nEnd Game & Show Final Results', inline: true}
        );
};