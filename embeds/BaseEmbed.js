'use strict';

const { DiscordAPIError } = require("discord.js")

const Discord = require('../node_modules/discord.js');
const PackageInfo = require('../package.json');

module.exports = (game) => {
    return new Discord.MessageEmbed()
        .setAuthor(`${game.host.username}'s ⚽ Rocket League Mafia Game ⚽`)
        .setColor('#fccffc')
        .setFooter(`Powered by Rocket League Mafia Bot v${PackageInfo.version}`, game.host.avatar);
};