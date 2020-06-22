# TODO


## HIGH PRIORITY

- [X] DM Villager and Mafia Messages
  - [X] Handle DMs NOT Open
- [X] Edit Registration Embed with Registered Players
- [ ] Test `m!kick <player>` feature
- [X] Add reaction hinting to Embeds
- [X] Handle end game -> remove game from players
- [ ] Add `m!help` command + embed
- [ ] Re-factor objects into MongoDB
- [X] MafiaCollector `.on('end')` needs to be added
- [ ] Test Leaderboard Sorting


## MEDIUM PRIORITY

- [X] Re-factor MessageManager embeds into separate file(s)
- [X] Edit Embed UI to be more "eye-pleasing"
- [ ] Private Games
  - [ ] Create temporary channel
  - [ ] Ask Host for Users to allow / invite
  - [ ] Users get added to temporary channel
  - [ ] After game end, post results to the main Mafia channel
- [ ] Handle Errors thrown by outputting something to console and discord game
- [ ] Add `m!leave` as override to leave all games associated with such player
- [ ] Add `m!end` for hosts to end the game manually at any point
- [X] Make "shuffle" for game-start represent shuffling teams ONLY
- [X] Make "rewind" for game-start represent going back to registration ONLY
- [ ] Refactor Emojis into separate file and change all uses to references
  - [ ] Replace business-level emojis with escaped unicode
- [ ] Refactor Collector times and max parameters to a guild or user profile
- [ ] Add `'use-strict';` to all files
- [X] Use 🥇, 🥈, and 🥉 for end leaderboard
- [ ] Find better way to display number of games played in Leaderboard


## LOW PRIORITY

- [ ] Add in more robust console debug logging and error logging
- [ ] `m!prefix <new_prefix>` Change RL Mafia prefix
- [ ] `m!role <role>` Change necessary role to participate in RL Mafia
- [ ] "ready-up" - based registration
- [ ] Allow host to set team names instead of default Blue and Orange
  - [ ] Also include assignments for reactions
- [ ] Allow host to host a game without participating (as spectator)
  - [ ] Allow a spectator host to host multiple games
- [ ] Give some indication for what points were awarded in the match
- [ ] Update "game will end" messages on embeds to update by the minute as 'time remaining' fields
- [ ] Add ability to re-assign mafia


## ALREADY COMPLETED (Prior to Version Control on GitHub)

- [X] Added `m!new` command for creating new Games
- [X] Updated bot activity
- [X] Added `m!kick` functionality -- untested
- [X] Added `ready`, `guildCreate`, `guildDelete`, and `message` handlers for bot / client
- [X] Added a "Game" class to represent individual games
- [X] Added "Player" class to represent an active player in a "Game"
- [X] Added many console.debug statements to improve logging
- [X] Added full-game logic
- [X] Added skeletons of embeds to be sent at each game state
- [X] Added "MessageManager" class for sending embeds to server