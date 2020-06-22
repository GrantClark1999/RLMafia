module.exports = (game) => { return (reaction, user) => {
    return ['◀', '🔀', '▶'].includes(reaction.emoji.name) && user.tag === game.host.tag;
}};