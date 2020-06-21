const BaseEmbed = require('../BaseEmbed');

module.exports = (game) => {
    let vote_players = '';
    for (let i = 0; i < game.players.length; i++) {
        vote_players += `${num_emojis[i]} ${game.players[i].username}\n`;
    }
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .addField('Players', `${vote_players}`);
};