import { useEffect } from "react";
import { socket } from "../lib/socket";

export default function useLiveOrders(username, onEvent) {
  useEffect(() => {
    if (!username || typeof onEvent !== "function") return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-public-restaurant", username);

    socket.on("order:created", (payload) => {
      onEvent(payload.type, payload.order);
    });

    socket.on("order:updated", (payload) => {
      onEvent(payload.type, payload.order);
    });

    socket.on("order:deleted", (payload) => {
      onEvent(payload.type, payload.order);
    });

    return () => {
      // ❌ DO NOT DISCONNECT HERE
      socket.off("order:created");
      socket.off("order:updated");
      socket.off("order:deleted");
    };
  }, [username, onEvent]);
}
