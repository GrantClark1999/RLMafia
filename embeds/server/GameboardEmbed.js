const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    let teams = game.getTeams();
    let blue_team = teams[0];
    let orange_team = teams[1];
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .setDescription(`Join your assigned team and play the Rocket League match, keeping in ` + 
        `mind your assigned roles for this game.\nWhen you're done, ${game.host.user} can begin ` +
        `the voting process.\n\nGame will automatically end in 5 minutes if no reaction is given.`)
        .addFields(
            { name: 'Blue Team', value: `${blue_team}`, inline: true },
            { name: 'Orange Team', value: `${orange_team}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Reactions', value: '◀\n🔀\n▶', inline: true },
            { name: 'Action', value: 'Back to Registration\nChange Teams\nReady To Vote', inline: true },
            { name: '\u200B', value: '\u200B', inline: true }
        );
};