module.exports = (game) => { return (reaction, user) => {
    if (game.last_message.author.id === user.id)
        return false;
    if (reaction.emoji.name === '▶') {
        if (game.host.tag === user.tag) {
            return true;
        } else {
            reaction.users.remove(user.id);
            return false;
        }
    }
    if (['✅', '❌', '🟢'].includes(reaction.emoji.name)) {
        return true;
    } else {
        reaction.remove();
        return false;
    }
}};