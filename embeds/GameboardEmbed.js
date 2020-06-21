const BaseEmbed = require('./BaseEmbed');

module.exports = (game) => {
    let teams = game.getTeams();
    let blue_team = teams[0];
    let orange_team = teams[1];
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .addFields(
            { name: 'Blue Team', value: `${blue_team}`, inline: true },
            { name: 'Orange Team', value: `${orange_team}`, inline: true }
        );
};