const BaseEmbed = require('../BaseEmbed');
const Format = require('../Format');

module.exports = (game) => {
    let formatted = Format.formatPlayers(game, 'REGISTRATION');
    return BaseEmbed(game)
        .setTitle(`React  ✅  To Join!`)
        .setDescription(`${game.host.user} start the game when ready.\n\nGame will automatically end in 5 minutes if game has not started.`)
        .addFields(
            { name: 'Reactions', value: '✅\n❌\n🟢\n▶', inline: true},
            { name: 'Action', value: 'Join\nLeave\nReady\nStart', inline: true},
            { name: '\u200B', value: '\u200B', inline: true},
            { name: 'Players', value: formatted[0], inline: true},
            { name: 'Status', value: formatted[1], inline: true},
            { name: '\u200B', value: '\u200B', inline: true}
        )
};