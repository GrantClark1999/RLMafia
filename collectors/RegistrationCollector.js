module.exports = (collector, game) => {
    collector.on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '▶') {
            game.start();
            return true;
        } else if (reaction.emoji.name === '✅') {
            game.join(user);
        } else if (reaction.emoji.name === '❌') {
            game.leave(user);
        }
    });
    collector.on('end', (collected, reason) => {
        let has_collected = (collected.size !== 0);
        if (!has_collected && reason !== 'messageDelete') {
            console.debug(`Ending game after ${collected.size} collections from REGISTRATION due to ${reason}`);
            game.end();
        }
        return has_collected;
    });
}