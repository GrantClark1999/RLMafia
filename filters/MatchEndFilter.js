module.exports = (game) => { return (reaction, user) => {
    if (game.last_message.author.id === user.id)
        return false;
    if (game.host.tag !== user.tag) {
        reaction.users.remove(user.id);
        return false;
    }
    return ['🔵', '🟠'].includes(reaction.emoji.name);
}};