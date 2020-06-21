module.exports = (collector, game) => {
    collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name === '▶') 
            game.matchEnd();
        else if (reaction.emoji.name === '🔀')
            game.register();
        else 
            return false;
        return true;
    });
    collector.on('end', (collected, reason) => {
        let has_collected = (collected.size !== 0);
        if (reason !== 'messageDelete') {
            console.debug(`Ending game after ${collected.size} collections from GAMEBOARD due to ${reason}`);
            game.end();
        }
        return has_collected;
    });
}