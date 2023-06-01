
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import actors from './actors';
import path from 'path';
import express, { Request, Response } from 'express';
import { getFilmsFromDatabase } from './db';


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.use('/api', routes);
app.use('/api', actors);

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// API route for fetching films data
app.get('/api/films', async (req: Request, res: Response) => {
    try {
      // Fetch films data from the database
      const films = await getFilmsFromDatabase();
      res.json(films);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

import mysql from 'mysql2/promise';


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'roottoor',
  database: 'sakila'
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM actor');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

export default app;
