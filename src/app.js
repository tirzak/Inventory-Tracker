import express from 'express';
import apiV1 from './api/v1';

import path from 'path'
import { db } from './database';
import bodyParser from 'body-parser'




 export const app = express ();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.use('/api/v1', apiV1()) 
app.use('/', express.static(path.join(__dirname, 'static/')))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});//Redirects unknown routes to index

