#!/usr/bin/env node
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import actors from './actors';
import path from 'path';
import express, { Request, Response } from 'express';
//import { getFilmsFromDatabase } from './db';


const app = express();
app.use(bodyParser.json());
app.use(express.json());
//@ts-ignore
app.use((0, cors_1.default)({ 'Access-Control-Allow-Origin': '*' }));


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.use('/api', routes);
app.use('/api', actors);

// Serve index.html for the root URL
/*app.get('/', (req:Request, res:Response) => {

  });*/



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

import mysql from 'mysql2/promise';

var fs = require('fs');

const db = mysql.createPool({
  host: 'tsiprojectsql.mysql.database.azure.com',
  user: 'admin1',
  password: 'Password1',
  database: 'sakila',
  ssl: {
    ca: fs.readFileSync('dist/src/DigiCertGlobalRootCA.crt.pem')
  }
});

// API route for fetching films data
app.get('/api/films', async (req: any, res: any) => {
  try {
    // Fetch films data from the database
    const [films, _] = await db.query('SELECT * FROM film');
    res.json(films);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/test-db', async (req:Request, res:any) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM actor');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error1');
  }
});

export default app;
