module.exports = (collector, game) => {
    collector.on('collect', (reaction, user) => {
        let index = num_emojis.indexOf(reaction.emoji.name);
        game.host = game.players[index];
    });
    collector.on('end', (collected, reason) => {
        let has_collected = (collected.size !== 0);
        if (!has_collected && reason !== 'messageDelete') {
            console.debug(`Ending game after ${collected.size} collections from CHANGE_HOST due to ${reason}`);
            game.end();
        }
        return has_collected;
    });
}