const RegistrationFilter = require('./RegistrationFilter');
const GameboardFilter = require('./GameboardFilter');
const MatchEndFilter = require('./MatchEndFilter');
const VoteFilter = require('./VoteFilter');
const AnnounceMafiaFilter = require('./AnnounceMafiaFilter');
const ChangeHostFilter = require('./ChangeHostFilter');

module.exports = {
    'REGISTRATION': RegistrationFilter,
    'GAMEBOARD': GameboardFilter,
    'MATCH_END': MatchEndFilter,
    'VOTE': VoteFilter,
    'MAFIA': AnnounceMafiaFilter,
    'CHANGE_HOST': ChangeHostFilter
}