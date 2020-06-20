- [About](#about)
- [Commands (Discord)](#commands-discord)
- [Restrictions](#restrictions)
- [Gameplay](#gameplay)
  - [Registration](#registration)
  - [Gameboard / RL Game Start](#gameboard--rl-game-start)
  - [RL Game End](#rl-game-end)
  - [Voting](#voting)
    - [Points](#points)
  - [Announce Mafia](#announce-mafia)
  - [End Game](#end-game)

## About

RLMafia is an open-source Discord Bot that allows you to play a simplified version of Mafia (a.k.a Werewolf / Town of Salem) alongside Rocket League.

## Commands (Discord)

| Command | Action                        |
| ------- | ----------------------------- |
| m!help  | Displays all commands         |
| m!new   | Creates a new game            |
| m!kick  | Kicks a player from your game |
| m!leave | Leaves any game you may be in |

## Restrictions

- All participants MUST allow DM's from other users in the server.
- A single player cannot be in two games at once (including the host).

## Gameplay

### Registration

When the mafia game starts, a message will be sent out for other users to register in your game. Users can react with ✅ to join, ❌ to leave, and the host can react with ▶ to start the game.

*In this time, if a user tries to join a game, and does not have DM's allowed from other users on that server, a message will be sent in chat indicating to the user why they were unable to join the game.*

### Gameboard / RL Game Start

At this stage, players will be assigned a team publically on the gameboard (blue or orange) and sent a DM from the RLMafia bot if they are `Villager` or `Mafia`. 

If you are assigned `Villager`, your goal is to win the match.

If you are assigned `Mafia`, your goal is to lose the match, but without getting caught.

If you would like to switch teams or allow players to join or leave the game before starting, the host can choose to react with 🔀 to go back to the registration stage.

Once you have your teams and roles, and are ready to play, hop into a private Rocket League match, join your respective teams, and play, keeping in mind what your role must accomplish. When the game ends, the host can react with ▶ to indicate the game has ended and you are ready to vote.

### RL Game End

The game will display a message asking the host of the game which team won. The host will react with 🔵 if blue team won, and 🟠 if the orange team won.

### Voting

Now, each player will vote for who they think the mafia was in the game they just played. If a strict majority of players vote against an individual, then that person will be "killed". If the individual was a `Villager`, nothing will happen. If the individual was a `Mafia` however, the mafia will lose points, and the villagers will gain bonus points. The points are allocated as follows (by default):

#### Points

| Villager         | Points |
| ---------------- | ------ |
| Won the Game     | 1      |
| Guessed Mafia    | 1      |
| Killed the Mafia | 2      |

| Mafia            | Points |
| ---------------- | ------ |
| Lost the Game    | 2      |
| Not Killed       | 1      |
| No Votes Against | 2      |

### Announce Mafia

Once the voting has ended, RLMafia will announce who the Mafia was for that match.

The host can choose to react with 🔁 to start a new RL match within the same mafia game session (keeping points tallied between RL matches), or with ⏹ to end the mafia game session.

### End Game

When the host decides to end the game, a final leaderboard is shown placing the players by total score acquired.