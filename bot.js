'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Game = require('./app/Game');
const { Error } = require('./errors');
const { ServerEmbeds } = require('./embeds');
// const GuildModel = require('./models/Guild');
// const { connect } = require('mongoose');

global.games = new Map();
global.num_emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

function updateActivity() {
    client.user.setActivity(`${config.prefix}help | Serving ${client.guilds.cache.size} servers!`);
}

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    updateActivity();
    // let guildIds = client.guilds.cache.map(guild => guild.id);
    // guildIds.forEach((element, index) => {
    //     GuildModel.findOne({ id: guild.id }, (err, exists) => {
    //         if (!exists) {
    //             const newGuild = new GuildModel({ id: guild.id });
    //             newGuild.save();
    //         }
    //     })
    // })
});

client.on("guildCreate", async guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    updateActivity();
    // const doc = new GuildModel({ id: guild.id });
    // await doc.save();
});

client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    updateActivity();
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let user = message.author.tag;

    switch(command) {
        case 'help':
            message.channel.send(ServerEmbeds['HELP']);
            message.delete();
            break;
        case 'new':
            if (!games.has(user)) {
                Game.create(message).then(game => {
                    games.set(user, game);
                });
            } else {
                throw new Error('GAME_ALREADY_EXISTS', user);
            }
            break;
        case 'kick':
            if (games.has(user)) {
                let game = games.get(user);
                if (game.host.tag === user) {
                    const kicked_player = args.shift();
                    game.leave(kicked_player);
                } else {
                    throw new Error('USER_IS_NOT_HOST', user);
                }
            } else {
                throw new Error('GAME_DOES_NOT_EXIST', user);
            }
            break;
        // case 'prefix':
        //     const req = await GuildModel.findOne({ id: message.guild.id });
        //     if (!req)
        //         return message.reply(`I was unable to find ${message.guild.name} in our database.`);
        //     return message.reply(`Prefix: ${req.prefix}`);
    }
});
// (async () => {
//     await connect('mongodb://localhost/rlmafia', {
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });
//     return client.login(config.token);
// })()
client.login(config.token);