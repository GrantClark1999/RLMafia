const BaseEmbed = require('./BaseEmbed');

module.exports = (game) => {
    return BaseEmbed(game)
        .setTitle(`React  ✅  To Join!`)
        .setDescription(`${game.host.user} start the game when ready.\n\nGame will automatically end in 5 minutes if game has not started.`)
        .addFields(
            { name: 'Reactions', value: '✅\n❌\n▶', inline: true},
            { name: 'Action', value: 'Join\nLeave\nStart', inline: true}
        )
};