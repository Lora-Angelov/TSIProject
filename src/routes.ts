import express from 'express';
import { Router, Request, Response } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import { executeQuery } from './db';
import db from './db';
 ////DATA VALIDATION///
import joi from 'joi';

import { getFilmsFromDatabase } from './db';

const router = express.Router();

/////FILMS////

const app = express();

app.get('/films', async (req: Request, res: Response) => {
    try {
      const films = await getFilmsFromDatabase();
      res.json(films);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching films' });
    }
  });



// Get a random film
router.get('/films/random', async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM film ORDER BY RAND() LIMIT 1');
    if (rows.length === 0) {
      res.status(404).json({ message: 'No films found' });
    } else {
      const randomFilm = rows[0] as RowDataPacket; // Type assertion to RowDataPacket
      res.json(randomFilm);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching random film' });
  }
});

// Get all films
router.get('/films', async (req, res) => {
  try {
    const films = await executeQuery('SELECT * FROM film');
    res.json(films);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Get a specific film by ID
router.get('/films/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const films = await executeQuery('SELECT * FROM film WHERE film_id = ?', [id]);
    if (films.length === 0) {
      res.status(404).send('Film not found');
    } else {
      res.json(films[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

export default router;


/*

/////CRUD FILMS/////



// Create a new film
router.post('/films', async (req: Request, res: Response) => {
    // Define the schema for the request body validation
    const schema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      release_year: joi.number().integer().min(1800).max(2100).required(),
      language_id: joi.number().integer().required()
    });
  
    try {
      // Validate the request body against the schema
      const { error, value } = schema.validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message); // 400 - Bad Request
        return;
      }
  
      // Destructure the validated values
      const { title, description, release_year, language_id } = value;
  
      // Perform the database operation
      await db.query(
        'INSERT INTO film (title, description, release_year, language_id) VALUES (?, ?, ?, ?)',
        [title, description, release_year, language_id]
      );
      
      res.sendStatus(201); // 201 - Created
    } catch (err: any) { // Specify the type as `any` or `Error`
      console.error(err);
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).send('Film already exists'); // 409 - Conflict
      } else {
        res.status(500).send('Database error');
      }
    }
  }); 



// Update a film by ID
router.put('/films/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, release_year, language_id } = req.body;
  
    // Define the schema for the request body validation
    const schema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      release_year: joi.number().integer().min(1800).max(2100).required(),
      language_id: joi.number().integer().required()
    });
  
    try {
      // Validate the request body against the schema
      const { error, value } = schema.validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message); // 400 - Bad Request
        return;
      }
  
      // Destructure the validated values
      const { title, description, release_year, language_id } = value;
  
      // Perform the database operation
      const [result] = await db.query(
        'UPDATE film SET title = ?, description = ?, release_year = ?, language_id = ? WHERE film_id = ?',
        [title, description, release_year, language_id, id]
      );
  
      const changedRows = (result as any).changedRows; // Access changedRows property
  
      if (changedRows === 0) {
        res.status(404).send('Film not found'); // 404 - Not Found
      } else {
        res.sendStatus(200); // 200 - OK
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  });
  

// Delete a film by ID
router.delete('/films/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
  
    // Validate the ID parameter
    const schema = joi.object({
      id: joi.number().integer().required()
      
    });
  
    try {
      // Validate the ID parameter against the schema
      const { error, value } = schema.validate({ id });
      if (error) {
        res.status(400).send(error.details[0].message); // 400 - Bad Request
        return;
      }
  
      // Perform the database operation
      const [result] = await db.query('DELETE FROM film WHERE film_id = ?', [id]);
  
      const affectedRows = (result as any).affectedRows; // Access affectedRows property
  
      if (affectedRows === 0) {
        res.status(404).send('Film not found'); // 404 - Not Found
      } else {
        res.sendStatus(200); // 200 - OK
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  });
  
 */



