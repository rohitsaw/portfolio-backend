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
var _Player_playerId, _Player_userName;
class Player {
    constructor(playerId, userName) {
        _Player_playerId.set(this, void 0);
        _Player_userName.set(this, void 0);
        __classPrivateFieldSet(this, _Player_playerId, playerId, "f");
        __classPrivateFieldSet(this, _Player_userName, userName, "f");
    }
    get userName() {
        return __classPrivateFieldGet(this, _Player_userName, "f");
    }
    get playerId() {
        return __classPrivateFieldGet(this, _Player_playerId, "f");
    }
    get user() {
        return {
            [__classPrivateFieldGet(this, _Player_playerId, "f")]: __classPrivateFieldGet(this, _Player_userName, "f"),
        };
    }
}
_Player_playerId = new WeakMap(), _Player_userName = new WeakMap();
export default Player;
