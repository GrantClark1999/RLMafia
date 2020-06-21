module.exports = (game) => { return (reaction, user) => {
    if (game.last_message.author.id === user.id)
        return false;
    return (['🔁', '⏹'].includes(reaction.emoji.name) && user.tag === game.host.tag);
}};