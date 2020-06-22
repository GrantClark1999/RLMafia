const RegistrationEmbed = require('../embeds/server/RegistrationEmbed')

module.exports = (collector, game) => {
    collector.on('collect', async (reaction, user) => {
        switch (reaction.emoji.name) {
            case '✅':
                game.join(user);
                break;
            case '❌':
                game.leave(user);
                break;
            case '🟢':
                game.find(user).status = 1;
                game.last_message.edit(RegistrationEmbed(game));
                break;
            case '▶':
                game.start()
                return true;
        }
    });
    collector.on('remove', (reaction, user) => {
        if (reaction.emoji.name === '🟢') {
            game.find(user).status = 0;
            game.last_message.edit(RegistrationEmbed(game));
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