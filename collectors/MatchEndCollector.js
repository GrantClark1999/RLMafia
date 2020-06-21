module.exports = (collector, game) => {
    collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name === '🔵') {
            game.match_winner = 0;
        } else {
            game.match_winner = 1;
        }
        game.vote();
        return true;
    });
    collector.on('end', (collected, reason) => {
        let has_collected = (collected.size !== 0);
        if (reason !== 'messageDelete') {
            console.debug(`Ending game after ${collected.size} collections from MATCH_END due to ${reason}`);
            game.end();
        }
        return has_collected;
    });
}