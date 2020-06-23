const BaseEmbed = require('../BaseEmbed');
const Format = require('../Format');

module.exports = (game) => {
    formatted = Format.formatPlayers(game, 'LEADERBOARD');
    return BaseEmbed(game)
        .setTitle('Final Results')
        .addFields(
            { name: 'Player', value: `${formatted[0]}`, inline: true },
            { name: 'Score', value: `${formatted[1]}`, inline: true},
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Stats', value: `Games Played`, inline: true },
            { name: '\u200B', value: `${game.match_num}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
        );
};