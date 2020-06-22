'use strict';

const Discord = require('../../node_modules/discord.js');
const PackageInfo = require('../../package.json');

let normal = 
    `**m!help** - You're already here...\n` +
    `**m!new** - Create a new RL Mafia game\n` + 
    `**m!leave** - Leaves any game you're registered in`;
let host = 
    `**m!kick <player>** - Kicks the player from your game\n` +
    `**m!end** - Force the game you're hosting to end`;
let admin = `WIP`;

module.exports = new Discord.MessageEmbed()
        .setTitle('Rocket League Mafia - Help v1')
        .setColor('#fccffc')
        .addFields(
            { name: 'Normal Commands', value: normal },
            { name: 'Host Commands', value: host },
            { name: 'Admin Commands', value: admin }
        )
        .setFooter(`Powered by Rocket League Mafia Bot v${PackageInfo.version}`);