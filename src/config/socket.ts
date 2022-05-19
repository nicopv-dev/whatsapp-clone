import io from "socket.io-client";

const SOCKET_URL = import.meta.SOCKET_URI || "http://localhost:8000";

export const socket = io(SOCKET_URL);
