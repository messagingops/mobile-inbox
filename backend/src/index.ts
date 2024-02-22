import express, { Express } from "express";
import contactRoute from './routes/contacts';
import loginRoute from './routes/login';
import messagesRoute from './routes/messages';
import wavesRoute from './routes/waves';
import listsRoute from './routes/lists';
import inboxRoute from './routes/inbox';
import homeRoute from './routes/home';

const app: Express = express()
const port = 3000

// Adding routes
app.use('/contacts', contactRoute);
app.use('/login', loginRoute);
app.use('/messages', messagesRoute);
app.use('/waves', wavesRoute);
app.use('/lists', listsRoute);
app.use('/inbox', inboxRoute);
app.use('/', homeRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
