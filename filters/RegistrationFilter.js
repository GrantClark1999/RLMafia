module.exports = (game) => { return (reaction, user) => {
    if (game.last_message.author.id === user.id)
        return false;
    if (game.host.tag === user.tag && reaction.emoji.name === '▶')
        return true;
    return ['✅', '❌'].includes(reaction.emoji.name);
}};