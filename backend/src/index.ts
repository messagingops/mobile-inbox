import express, { Express } from "express";
import http from 'http';
import { Server } from 'socket.io';
import contactRoute from './routes/contacts';
import loginRoute from './routes/login';
import messagesRoute from './routes/messages';
import wavesRoute from './routes/waves';
import listsRoute from './routes/lists';
import inboxRoute from './routes/inbox';
import homeRoute from './routes/home';
import webhookRoute from './routes/webhooks';

const app: Express = express()
const port = 3000

const server = http.createServer(app);
const io = new Server(server, {
  path: '/socket.io/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


// Adding routes
app.use('/contacts', contactRoute)
app.use('/login', loginRoute);
app.use('/messages', messagesRoute);
app.use('/waves', wavesRoute);
app.use('/lists', listsRoute);
app.use('/inbox', inboxRoute);
app.use('/webhook', webhookRoute);
app.use('/', homeRoute);

// Socket.IO connection setup
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Make the Socket.IO instance accessible in routes
app.set('socketio', io);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
