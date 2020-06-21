module.exports = (game) => { return (reaction, user) => {
    if (game.last_message.author.id === user.id)
        return false;
    let valid_reaction = false;
    let found_player = game.find(user);
    if (found_player === null) {
        reaction.users.remove(user.id);
    } else {
        found_player.has_voted = true;
        valid_reaction = num_emojis.includes(reaction.emoji.name);
    }
    return valid_reaction;
}};