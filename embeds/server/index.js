'use strict';

const HelpEmbed = require('./HelpEmbed');
const RegistrationEmbed = require('./RegistrationEmbed');
const GameboardEmbed = require('./GameboardEmbed');
const MatchEndEmbed = require('./MatchEndEmbed');
const VoteEmbed = require('./VoteEmbed');
const AnnounceMafiaEmbed = require('./AnnounceMafiaEmbed');
const LeaderboardEmbed = require('./LeaderboardEmbed');
const ChangeHostEmbed = require('./ChangeHostEmbed');

module.exports = {
    'HELP': HelpEmbed,
    'REGISTRATION': RegistrationEmbed,
    'GAMEBOARD': GameboardEmbed,
    'MATCH_END': MatchEndEmbed,
    'VOTE': VoteEmbed,
    'MAFIA': AnnounceMafiaEmbed,
    'LEADERBOARD': LeaderboardEmbed,
    'CHANGE_HOST': ChangeHostEmbed
}