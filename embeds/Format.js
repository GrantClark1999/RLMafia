'use strict';

class Format {
    static sortPlayersByScore(game) {
        let playersCopy = [...game.players];
        playersCopy.sort((a, b) => (a.score === b.score) ? a.tag.localeCompare(b.tag) : (b.score - a.score));
        return playersCopy
    }

    static sortPlayersByName(game) {
        let playersCopy = [...game.players];
        playersCopy.sort((a, b) => a.tag.localeCompare(b.tag));
        return playersCopy
    }

    static formatPlayers(game, type) {
        let sorted_players;
        let column1 = '';
        let column2 = '';
        switch (type) {
            case 'REGISTRATION':
                game.players.forEach(reg_player => {
                    let status_emojis = ['🔴', '🟢'];
                    column1 += `${reg_player.user}\n`;                      // col1 = players (by registration order)
                    column2 += `${status_emojis[reg_player.status]}\n`;     // col2 = status
                });
                break;
            case 'GAMEBOARD':
                sorted_players = this.sortPlayersByName(game);
                sorted_players.forEach(gb_player => {
                    if (gb_player.team === 0)
                        column1 += `${gb_player.user}\n`;                   // col1 = blue team
                    else
                        column2 += `${gb_player.user}\n`;                   // col2 = orange team
                });
                break;
            case 'LEADERBOARD':
                sorted_players = this.sortPlayersByScore(game);
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
                        column1 += `${award_emojis[last_pos]} `;            // col1 = (?award) players (by score)
                    column1 += `${player.user}\n`;
                    column2 += `${player.score}\n`;                         // col2 = score
                }
                break;
            case 'CHANGE_HOST':
                sorted_players = this.sortPlayersByName(game);
                sorted_players.forEach(ch_player => {
                    column1 += `${ch_player.user}\n`;                       // col1 = players (by name)
                });
                break;
            default:
                sorted_players = this.sortPlayersByScore(game);
                for (let i = 0; i < sorted_players.length; i++) {
                    let player = sorted_players[i];
                    column1 += `${num_emojis[i]} ${player.user}\n`;         // col1 = (default num emoji) players (by score)
                    column2 += `${player.score}\n`;                         // col2 = score
                }
                break;
        }
        if (column1 === '') column1 = '\u200B';
        if (column2 === '') column2 = '\u200B';

        return [column1, column2];
    }
}

module.exports = Format;