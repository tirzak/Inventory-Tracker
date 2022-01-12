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


app.use((_, res) => res.redirect("/api/v1"));
//Redirects unknown routes to index

