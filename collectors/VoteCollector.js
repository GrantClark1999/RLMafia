module.exports = (collector, game) => {
    collector.on('collect', (reaction, user) => {
        let index = num_emojis.indexOf(reaction.emoji.name);
        game.players[index].votes_against++;
    });
    collector.on('end', (collected, reason) => {
        let has_collected = (collected.size !== 0);
        if (!has_collected && reason !== 'messageDelete') {
            console.debug(`Ending game after ${collected.size} collections from VOTE due to ${reason}`);
            game.end();
        }
        game.assignPoints();
        game.announceMafia();
        return has_collected;
    });
}