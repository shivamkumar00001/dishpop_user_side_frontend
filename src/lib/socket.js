import { io } from "socket.io-client";

export const socket = io("https://dishpop-restro-side-backend.onrender.com", {
  transports: ["websocket"],
  autoConnect: false,
});
