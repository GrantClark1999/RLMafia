const BaseEmbed = require('../BaseEmbed');
const Format = require('../Format');

module.exports = (game) => {
    formatted = Format.formatPlayers(game, 'LEADERBOARD');
    return BaseEmbed(game)
        .setTitle(`Games Played`)
        .setDescription(game.match_num)
        .addFields(
            { name: 'Player', value: `${formatted[0]}`, inline: true },
            { name: 'Score', value: `${formatted[1]}`, inline: true}
        );
};