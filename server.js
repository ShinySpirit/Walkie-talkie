import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// public
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket
wss.on('connection', (ws) => {
    ws.on('message', (message) => {      
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
