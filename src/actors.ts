import express from 'express';
import { Request, Response } from 'express';
import db from './db';

const router = express.Router();

// Define the Joi schema for actor validation
/*const actorSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required()
  });*/

// Get all actors
router.get('/actors', async (req: Request, res: any) => {
  try {
    const [actors] = await db.query('SELECT * FROM actor');
    res.json(actors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error4');
  }
});

// Get a single actor by ID
router.get('/actors/:id', async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const [actor] = await db.query('SELECT * FROM actor WHERE actor_id = ?', [id]);
      if (Array.isArray(actor) && actor.length === 0) {
        res.status(404).send('Actor not found');
      } else if (Array.isArray(actor)) {
        res.json(actor[0]);
      } else {
        res.status(500).send('Database error5');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error6');
    }
  });


  /*
// Create a new actor
router.post('/actors', async (req: Request, res: Response) => {
    const { error, value } = actorSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
  
    const { first_name, last_name } = value;
    try {
      const result = await db.query('INSERT INTO actor (first_name, last_name) VALUES (?, ?)', [first_name, last_name]);
      const insertId = (result as any).insertId;
      res.status(201).json({ actor_id: insertId });
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  });

// Update an actor by ID
router.put('/actors/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error, value } = actorSchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
  
    const { first_name, last_name } = value;
    try {
      const result = await db.query('UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?', [
        first_name,
        last_name,
        id
      ]);
  
      if (Array.isArray(result) && result.length > 0) {
        const updateResult = result[0] as any;
        if (updateResult.affectedRows === 0) {
          res.status(404).send('Actor not found');
        } else {
          res.sendStatus(200);
        }
      } else {
        res.status(500).send('Database error');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  });
  
// Delete an actor by ID
router.delete('/actors/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.query('DELETE FROM actor WHERE actor_id = ?', [id]);
  
      if (Array.isArray(result) && result.length > 0) {
        const deleteResult = result[0] as any;
        if (deleteResult.affectedRows === 0) {
          res.status(404).send('Actor not found');
        } else {
          res.sendStatus(200);
        }
      } else {
        res.status(500).send('Database error');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  });*/

export default router;
