import socketIOClient from "socket.io-client";
 
let endpoint = "/admin";
let socket = socketIOClient(endpoint);

export default socket