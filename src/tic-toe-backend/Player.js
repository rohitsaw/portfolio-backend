class Player {
  #playerId;
  #userName;

  constructor(playerId, userName) {
    this.#playerId = playerId;
    this.#userName = userName;
  }

  get userName() {
    return this.#userName;
  }

  get playerId() {
    return this.#playerId;
  }
  
  get user() {
    return {
      [this.#playerId]: this.#userName,
    };
  }
}

export default Player;
