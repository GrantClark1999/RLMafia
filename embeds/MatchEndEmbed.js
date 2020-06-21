const BaseEmbed = require('./BaseEmbed');

module.exports = (game) => {
    return BaseEmbed(game)
        .setTitle(`Game ${game.match_num}`)
        .setDescription(`Which Team Won, ${game.host.username}?\nGame will automatically end in 5 minutes if no reaction is given.`);
};