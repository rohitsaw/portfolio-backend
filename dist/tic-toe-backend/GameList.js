import Game from "./Game.js";
class GameList {
    static getAllgames() {
        return this.games;
    }
    static findGameIdFromPlayerId(userId) {
        let ans = { gameId: null, userName: null };
        this.games.forEach((game) => {
            Object.keys(game.users).forEach((uid) => {
                if (uid === userId) {
                    ans = { gameId: game.gameId, userName: game.users[uid] };
                }
            });
        });
        return ans;
    }
    static addGamesIfNotExist(gameId) {
        const found = this.games.find((each) => each.gameId === gameId);
        if (found) {
            return found;
        }
        else {
            this.games.push(new Game(gameId));
            return this.games.at(-1);
        }
    }
    static playerLeft(gameId, userId) {
        const gameIndex = this.games.findIndex((each) => each.gameId === gameId);
        if (gameIndex > 0) {
            const res = this.games[gameIndex].playerLeft(userId);
            if (res === "Both Player Left") {
                this.games.splice(gameIndex, 1);
            }
        }
    }
}
GameList.games = [];
export default GameList;
