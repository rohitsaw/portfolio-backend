import { addSocket } from "./socket.js";

// Backend For https://tictoe-rsaw409.onrender.com
const main = async (http) => {
  addSocket(http);

  console.log("tictoe Server is Ready.");
};

export default main;
