const { Error } = require('../errors')

class Player {
    constructor(user, game) {
        this.user = user;
        this.username = user.username;
        this.tag = user.tag;
        this.avatar = user.avatarURL();

        this.game = game;
        this.team = 0;
        this.score = 0;
        this.has_voted = false;
        this.votes_against = 0;
        this.is_dead = false;
    }

    async initialize() {
        try {
            this.dm_channel = await this.user.createDM();
        } catch (err) {
            console.error(err);
            throw new Error('DM_ERROR', user);
        }
    }

    static async create(user, game) {
        const o = new Player(user, game);
        await o.initialize();
        return o;
    }
}

module.exports = Player;