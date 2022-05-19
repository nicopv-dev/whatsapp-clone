import io from "socket.io-client";

const SOCKET_URL = "https://whatsapp-clone-api-app-develop.herokuapp.com";

export const socket = io(SOCKET_URL);
