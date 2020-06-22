module.exports = (collector, game) => {
    collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name === '◀') {
            game.match_num--;
            game.register();
        } else if (reaction.emoji.name === '🔀') {
            game.match_num--;
            game.start();
        } else if (reaction.emoji.name === '▶') {
            game.matchEnd();
        } else
            return false;
        return true;
    });
    collector.on('end', (collected, reason) => {
        let has_collected = (collected.size !== 0);
        if (!has_collected && reason !== 'messageDelete') {
            console.debug(`Ending game after ${collected.size} collections from GAMEBOARD due to ${reason}`);
            game.end();
        }
        return has_collected;
    });
}