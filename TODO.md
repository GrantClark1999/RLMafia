# TODO


## HIGH PRIORITY

- [ ] DM Villager and Mafia Messages
  - [ ] Handle DMs NOT Open
- [ ] Edit Registration Embed with Registered Players
- [ ] Test `m!kick <player>` feature
- [ ] Add reaction hinting to Embeds
- [ ] Handle end game -> remove game from players
- [ ] Add `m!help` command + embed
- [ ] Re-factor objects into MongoDB


## MEDIUM PRIORITY

- [ ] Re-factor MessageManager embeds into separate json file(s)
- [ ] Edit Embed UI to be more "eye-pleasing"
- [ ] Private Games
  - [ ] Create temporary channel
  - [ ] Ask Host for Users to allow / invite
  - [ ] Users get added to temporary channel
  - [ ] After game end, post results to the main Mafia channel
- [ ] Handle Errors thrown by outputting something to console and discord game
- [ ] Add `m!leave` as override to leave all games associated with such player
- [ ] Make "shuffle" for game-start represent shuffling teams ONLY
- [ ] Make "rewind" for game-start represent going back to registration ONLY


## LOW PRIORITY

- [ ] Add in more robust console debug logging and error logging
- [ ] `m!prefix <new_prefix>` Change RL Mafia prefix
- [ ] `m!role <role>` Change necessary role to participate in RL Mafia
- [ ] "ready-up" - based registration
- [ ] Allow host to set team names instead of default Blue and Orange
  - [ ] Also include assignments for reactions
- [ ] Allow host to host a game without participating (as spectator)
  - [ ] Allow a spectator host to host multiple games
- [ ] Give some indication for what points were awarded in the match.


## ALREADY COMPLETED

- [X] Added `m!new` command for creating new Games
- [X] Updated bot activity
- [X] Added `m!kick` functionality -- untested
- [X] Added `ready`, `guildCreate`, `guildDelete`, and `message` handlers for bot / client
- [X] Added a "Game" class to represent individual games.
- [X] Added "Player" class to represent an active player in a "Game"
- [X] Added many console.debug statements to improve logging
- [X] Added full-game logic
- [X] Added skeletons of embeds to be sent at each game state
- [X] Added "MessageManager" class for sending embeds to server