import WebSocket, { WebSocketServer } from 'ws';
import "dotenv/config"

// Create a WebSocket server
// @ts-ignore
const wss = new WebSocket.Server({ port: 8089 });

const runWebSocket = ()=>{
    // Event listener for when a client connects
    wss.on('connection', function connection(ws) {
        console.log('A client connected');
    
        // Event listener for messages from clients
        ws.on('message', function incoming(message) {
        const messageString = message.toString();
        console.log('Received message:', messageString);
    
        // Broadcast the received message to all clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(messageString);
            }
        });
        });
    
        // Event listener for when a client disconnects
        ws.on('close', function close() {
        console.log('A client disconnected');
        });
    });
    
    console.log('WebSocket server started on port 8089');
};

export const getWebSocket = ()=>{return wss;}

export default runWebSocket;