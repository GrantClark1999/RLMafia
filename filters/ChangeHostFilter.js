module.exports = (game) => { return (reaction, user) => {
    if (game.last_message.author.id === user.id)
        return false;
    if (game.host.tag !== user.tag) {
        reaction.users.remove(user.id);
        return false;
    }
    if (num_emojis.includes(reaction.emoji.name)) {
        return true;
    } else {
        reaction.remove();
        return false;
    }
}};