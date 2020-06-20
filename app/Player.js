const { Error } = require('../errors')

class Player {
    constructor(user, game) {
        this.user = user;
        this.username = user.username;
        this.tag = user.tag;
        this.avatar = user.avatarURL();
        try {
            this.dm_channel = user.dm_channel || (async () => await user.createDM())();
            // this.dm_channel = (user.dm_channel !== undefined) ? user.dm_channel : (async () => await user.createDM())();
            console.debug(this.dm_channel);
            this.dm_channel.send('TEST MESSAGE');
        } catch (err) {
            console.error(err);
            throw new Error('DM_ERROR', user);
        }

        this.game = game;
        this.team = 0;
        this.score = 0;
        this.has_voted = false;
        this.votes_against = 0;
        this.is_dead = false;
    }
}

module.exports = Player;