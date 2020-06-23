module.exports = (collector, game) => {
    collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name === '🔁') {
            game.start();
        } else if (reaction.emoji.name === '⏹') {
            game.end();
        } else {
            return false;
        }
        return true;
    });
    collector.on('end', (collected, reason) => {
        let has_collected = (collected.size !== 0);
        if (!has_collected && reason !== 'messageDelete') {
            console.debug(`Ending game after ${collected.size} collections from MAFIA due to ${reason}`);
            game.end();
        }
        return has_collected;
    });
}