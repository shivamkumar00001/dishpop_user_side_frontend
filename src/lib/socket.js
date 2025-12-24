import { io } from "socket.io-client";

const SOCKET_URL = "https://dishpop-restro-side-backend.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
