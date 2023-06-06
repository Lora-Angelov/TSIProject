"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const db_2 = __importDefault(require("./db"));
const router = express_1.default.Router();
/////FILMS////
const app = (0, express_1.default)();
// Get a random film
router.get('/films/random', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_2.default.query('SELECT * FROM film ORDER BY RAND() LIMIT 1');
        if (rows.length === 0) {
            res.status(404).json({ message: 'No films found' });
        }
        else {
            const randomFilm = rows[0]; // Type assertion to RowDataPacket
            res.json(randomFilm);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching random film' });
    }
}));
// Get all films
router.get('/films', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const films = yield (0, db_1.executeQuery)('SELECT * FROM film');
        res.json(films);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database error2');
    }
}));
// Get a specific film by ID
router.get('/films/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const films = yield (0, db_1.executeQuery)('SELECT * FROM film WHERE film_id = ?', [id]);
        if (films.length === 0) {
            res.status(404).send('Film not found');
        }
        else {
            res.json(films[0]);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database error3');
    }
}));
exports.default = router;
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
