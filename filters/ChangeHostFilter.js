module.exports = (game) => { return (reaction, user) => {
    if (user.bot)
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