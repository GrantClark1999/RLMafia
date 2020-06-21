'use strict';
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Game = require('./app/Game');
const { Error } = require('./errors');

global.games = new Map();

function updateActivity() {
    client.user.setActivity(`${config.prefix}help | Serving ${client.guilds.cache.size} servers!`);
}

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    updateActivity();
});

client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    updateActivity();
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
        case 'new':
            if (!games.has(user)) {
                Game.create(message);
            } else {
                throw new Error('GAME_ALREADY_EXISTS', user);
            }
            break;
        case 'kick':
            if (games.has(user)) {
                game = games.get(user);
                if (game.host.tag === user) {
                    const kicked_player = args.shift();
                    game.leave(kicked_player);
                } else {
                    throw new Error('USER_IS_NOT_HOST', user);
                }
            } else {
                throw new Error('GAME_DOES_NOT_EXIST', user);
            }
    }
});

client.login(config.token);