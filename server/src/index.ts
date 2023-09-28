import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();
const PORT = (process.env.PORT || 3000) as number;

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    console.log(`We got a connection ${socket.id}`)
})

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
})

httpServer.listen(PORT, () => {
    console.log(`Started listening on port ${PORT}`);
});