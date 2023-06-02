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
const db_1 = __importDefault(require("./db"));
const joi_1 = __importDefault(require("joi"));
const router = express_1.default.Router();
// Define the Joi schema for actor validation
const actorSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required()
});
// Get all actors
router.get('/actors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [actors] = yield db_1.default.query('SELECT * FROM actor');
        res.json(actors);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
}));
// Get a single actor by ID
router.get('/actors/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [actor] = yield db_1.default.query('SELECT * FROM actor WHERE actor_id = ?', [id]);
        if (Array.isArray(actor) && actor.length === 0) {
            res.status(404).send('Actor not found');
        }
        else if (Array.isArray(actor)) {
            res.json(actor[0]);
        }
        else {
            res.status(500).send('Database error');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
}));
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
exports.default = router;
