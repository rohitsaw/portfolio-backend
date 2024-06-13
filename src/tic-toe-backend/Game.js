class Game {
  #gameId;
  #playerA;
  #playerB;
  #isReady = false;

  constructor(gameId) {
    this.#gameId = gameId;
  }

  get gameId() {
    return this.#gameId;
  }

  get isReady() {
    return this.#isReady;
  }

  addPlayer(player) {
    if (!this.#playerA) {
      this.#playerA = player;
    } else {
      this.#playerB = player;
    }

    if (this.#playerA && this.#playerB) {
      this.#isReady = true;
    }
  }

  playerLeft(playerId) {
    if (this.#playerA?.playerId === playerId) {
      this.#playerA = null;
    } else if (this.#playerB?.playerId === playerId) {
      this.#playerB = null;
    }

    if (this.#playerA === null && this.#playerB === null) {
      return "Both Player Left";
    }
  }

  get users() {
    return {
      ...this.#playerA.user,
      ...this.#playerB.user,
    };
  }
}

export default Game;
