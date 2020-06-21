const RegistrationCollector = require('./RegistrationCollector');
const GameboardCollector = require('./GameboardCollector');
const MatchEndCollector = require('./MatchEndCollector');
const VoteCollector = require('./VoteCollector');
const AnnounceMafiaCollector = require('./AnnounceMafiaCollector');
const ChangeHostCollector = require('./ChangeHostCollector');

module.exports = {
    'REGISTRATION': RegistrationCollector,
    'GAMEBOARD': GameboardCollector,
    'MATCH_END': MatchEndCollector,
    'VOTE': VoteCollector,
    'MAFIA': AnnounceMafiaCollector,
    'CHANGE_HOST': ChangeHostCollector
}