'use strict';

class Format {
    static sortPlayers(game) {
        let playersCopy = [...game.players];
        // playersCopy.sort((a, b) => (a.score > b.score) ? 1 : (a.score === b.score) ?
        //     a.tag.localeCompare(b.tag) : -1 );
        playersCopy.sort((a, b) => (a.score === b.score) ? a.tag.localeCompare(b.tag) : (b.score - a.score));
        return playersCopy
    }

    static formatPlayers(game, type) {
        let sorted_players = this.sortPlayers(game);
        let formatted_players = '';
        let formatted_other = '';
        switch (type) {
            case 'REGISTRATION':
                game.players.forEach(reg_player => {
                    let status_emojis = ['🔴', '🟢'];
                    formatted_players += `${reg_player.username}\n`;
                    formatted_other += `${status_emojis[reg_player.status]}`
                })
                break;
            case 'LEADERBOARD':
                let last_val = -1;
                let last_pos = 0;
                let award_emojis = ['🥇', '🥈', '🥉'];
                for (let i = 0; i < sorted_players.length; i++) {
                    let player = sorted_players[i];
                    if (player.score !== last_val) {
                        last_pos = i;
                        last_val = player.score;
                    }
                    if (last_pos < award_emojis.length)
                        formatted_players += `${award_emojis[last_pos]} `;
                    formatted_players += `${player.username}\n`;
                    formatted_other += `${player.score}\n`;
                }
                break;
            default:
                for (let i = 0; i < sorted_players.length; i++) {
                    let player = sorted_players[i];
                    formatted_players += `${num_emojis[i]} ${player.username}\n`;
                    formatted_other += `${player.score}\n`;
                }
                break;
        }
        if (formatted_players === '') formatted_players = 'No Players';
        if (formatted_other === '') formatted_other = 'None';

        return [formatted_players, formatted_other];
    }
}

module.exports = Format;