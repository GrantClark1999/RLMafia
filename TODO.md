# TODO

## BUGS

## TESTING
- [ ] Removes non-host reactions where necessary and removes votes from non-players
- [ ] Test registration embed for when people join / leave
- [ ] Make sure any non-participant canont react to game-level reactions (excluding registration)
- [ ] Make sure no more than 8 people can join
- [ ] Test to make sure Change Host collects reactions from host and sets new host

## HIGH PRIORITY (Features / Improvements)

- [ ] See point tallies at any point in the game
- [ ] Re-factor objects into MongoDB (or SQL Database)
- [ ] `m!kick` -> reaction-based
- [ ] Test Leaderboard Sorting
- [ ] Add `m!info` command -> game information
- [ ] Add stat information to Leaderboard (num mafia kills, biggest deception, etc.)
- [ ] Add ability to skip the entire game from anywhere
  - [ ] Either implement `m!skip` or add ⏭ to every embed + collection


## MEDIUM PRIORITY (Features / Improvements)

- [ ] Private Games
  - [ ] Create temporary channel
  - [ ] Ask Host for Users to allow / invite
  - [ ] Users get added to temporary channel
  - [ ] After game end, post results to the main Mafia channel
- [ ] Allow players to CHOOSE their teams (team captains, host chooses, etc.)
- [ ] Handle Errors thrown by outputting something to console and discord game
- [ ] Add `m!leave` as override to leave all games associated with such player
- [ ] Add `m!end` for hosts to end the game manually at any point
- [ ] Refactor Emojis into separate file and change all uses to references
  - [ ] Replace business-level emojis with escaped unicode
- [ ] Refactor Collector times and max parameters to a guild or user profile
- [ ] Add `'use-strict';` to all files
- [ ] Find better way to display number of games played in Leaderboard
- [ ] Possible --- Add reactions to DMs to acknowledge your roles as a 'ready-up'.


## LOW PRIORITY (Features / Improvements)

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


## Mafia Role Ideas
- [ ] `Jester` role -> try to win the game, but try to get lynched in the voting process.
- [ ] `Demolitionist` role -> gets +1 point for every n demos


## COMPLETED
- [X] DM Villager and Mafia Messages
  - [X] Handle DMs NOT Open
- [X] Edit Registration Embed with Registered Players
- [X] Add reaction hinting to Embeds
- [X] Handle end game -> remove game from players
- [X] MafiaCollector `.on('end')` needs to be added
- [X] Re-factor MessageManager embeds into separate file(s)
- [X] Edit Embed UI to be more "eye-pleasing"
- [X] Make "shuffle" for game-start represent shuffling teams ONLY
- [X] Make "rewind" for game-start represent going back to registration ONLY
- [X] Use 🥇, 🥈, and 🥉 for end leaderboard
- [X] Add `m!help` command + embed
- [X] Ensure players are listed on Registration Embed on Join/Leave
- [X] Fix Game # Increment
- [X] Make sure RLMafia only ever has one embed on DMs at a time for a game
- [X] Make sure Registered player status' are separated by `\n`
- [X] Fix DM when starting new game
- [X] Switch teams on new match
- [X] Not removing non-host reactions (at least from announce-mafia)
- [X] Separate Change Teams and Change Mafia
- [X] Made 'No Players' show as blank if no players are assigned to a team
- [X] Test new find() method -> does not work (replaced back with old)
- [X] Make Change Teams only edit embed, not re-send
- [+] Registration embed only updating joined users on status change or leave
- [X] Gives game is not defined error at bot.js : 55 : 22
  - [+] More players on Orange than on Blue
- [X] Fix Change Host not collecting reactions from host.


## COMPLETED (prior to version-control via Github)

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