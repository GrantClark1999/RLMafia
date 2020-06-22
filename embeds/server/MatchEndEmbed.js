const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .setDescription(`Which Team Won, ${game.host.username}?\n\nGame will automatically end in 5 minutes if no reaction is given.`)
        .addFields(
            { name: 'Reactions', value: '🔵\n🟠', inline: true },
            { name: 'Action', value: 'Blue Team\nOrange Team', inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
        )
};