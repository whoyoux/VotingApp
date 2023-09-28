import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

const users = [] as string[];

dotenv.config();
const PORT = (process.env.PORT || 3000) as number;

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:8000'
    }
});

app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    users.push(socket.id);
    console.log(`Socket ${socket.id} connected.`)

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`)
        users.splice(users.indexOf(socket.id), 1);
    })
})

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
})

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
})

httpServer.listen(PORT, () => {
    console.log(`Started listening on port ${PORT}`);
});