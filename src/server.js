import express from 'express';
import apiV1 from './api/v1';
import dotenv from 'dotenv';
import path from 'path'
import { db } from './database';
import bodyParser from 'body-parser'
dotenv.config();

let port = process.argv[2]
const app = express ();


db.connect()//connects with db
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.use('/api/v1', apiV1()) 
app.use('/', express.static(path.join(__dirname, 'static/')))
const server= app.listen(port, ()=>{
    console.log (`Listening on http://localhost:${port}`) 
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});//Redirects unknown routes to index

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('Stopping server...');
    await server.close({timeout:10000})
    db.end();
    console.log('Server stopped');
    process.exit(0);
});//Closes the server
