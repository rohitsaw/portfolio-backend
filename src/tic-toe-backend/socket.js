import { Server } from "socket.io";

import Player from "./Player.js";
import GameList from "./GameList.js";

const addSocket = (http) => {
  const io = new Server(http, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? "https://tictoe-rsaw409.onrender.com"
          : "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", function (socket) {
    socket.on("joinGame", (data) => {
      const player = new Player(socket.id, data.userName);
      const game = GameList.addGamesIfNotExist(data.gameId);

      console.log("game", game, game.users);

      if (game.isReady) {
        io.sockets.in(game.gameId).emit("users", game.users);
      } else {
        socket.join(game.gameId);
        game.addPlayer(player);

        console.log(
          `${player.userName} - ${player.playerId} has joined game with id ${game.gameId}`
        );
      }
    });

    socket.on("madeMove", (data) => {
      console.log("madeMove", data);
      socket.to(data.gameId).emit("receivedFromServer", data);
    });

    socket.on("RestartGame", (data) => {
      console.log("RestartGame", data);
      socket.to(data.gameId).emit("userRestartedGame", data);
    });

    socket.on("LeftGame", (data) => {
      console.log("LeftGame", data);
      GameList.playerLeft(data.gameId, data.userId);

      socket.to(data.gameId).emit("userLeftGame", data);

      socket.leave(data.gameId);
    });

    socket.on("disconnecting", (reason) => {
      const userId = socket.id;
      const { gameId, userName } = GameList.findGameIdFromPlayerId(userId);
      if (gameId && userName) {
        socket.to(gameId).emit("userDisconnected", userName);
      }
    });
  });
};

export { addSocket };
