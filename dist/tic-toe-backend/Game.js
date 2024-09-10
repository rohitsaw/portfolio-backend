var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_gameId, _Game_playerA, _Game_playerB, _Game_isReady;
class Game {
    constructor(gameId) {
        _Game_gameId.set(this, void 0);
        _Game_playerA.set(this, void 0);
        _Game_playerB.set(this, void 0);
        _Game_isReady.set(this, false);
        __classPrivateFieldSet(this, _Game_gameId, gameId, "f");
    }
    get gameId() {
        return __classPrivateFieldGet(this, _Game_gameId, "f");
    }
    get isReady() {
        return __classPrivateFieldGet(this, _Game_isReady, "f");
    }
    addPlayer(player) {
        if (!__classPrivateFieldGet(this, _Game_playerA, "f")) {
            __classPrivateFieldSet(this, _Game_playerA, player, "f");
        }
        else {
            __classPrivateFieldSet(this, _Game_playerB, player, "f");
        }
        if (__classPrivateFieldGet(this, _Game_playerA, "f") && __classPrivateFieldGet(this, _Game_playerB, "f")) {
            __classPrivateFieldSet(this, _Game_isReady, true, "f");
        }
    }
    playerLeft(playerId) {
        if (__classPrivateFieldGet(this, _Game_playerA, "f")?.playerId === playerId) {
            __classPrivateFieldSet(this, _Game_playerA, null, "f");
        }
        else if (__classPrivateFieldGet(this, _Game_playerB, "f")?.playerId === playerId) {
            __classPrivateFieldSet(this, _Game_playerB, null, "f");
        }
        if (__classPrivateFieldGet(this, _Game_playerA, "f") === null && __classPrivateFieldGet(this, _Game_playerB, "f") === null) {
            return "Both Player Left";
        }
    }
    get users() {
        return {
            ...__classPrivateFieldGet(this, _Game_playerA, "f").user,
            ...__classPrivateFieldGet(this, _Game_playerB, "f").user,
        };
    }
}
_Game_gameId = new WeakMap(), _Game_playerA = new WeakMap(), _Game_playerB = new WeakMap(), _Game_isReady = new WeakMap();
export default Game;
