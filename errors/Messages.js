'use strict';

const { register } = require('./RLMError');

const Messages = {
    GAME_ALREADY_EXISTS: (user) => `${user} already has an active game. End the current game to create a new one.`,
    GAME_DOES_NOT_EXIST: (user) => `${user} does not have any active games.`,
    USER_IS_NOT_HOST: (user) => `${user} is not the host of the game they are in.`,
    GAME_IS_FULL: (user) => `Cannot add ${user} to full game.`,
    DM_ERROR: (user) => `${user} must have DM's enabled on this server to play RLMafia.\n*Enable DMs by clicking: ServerName -> Privacy Settings -> Enable*`,
}

for (const [name, message] of Object.entries(Messages)) register(name, message);