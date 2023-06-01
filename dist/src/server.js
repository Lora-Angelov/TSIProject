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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const actors_1 = __importDefault(require("./actors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static('public'));
app.use('/api', routes_1.default);
app.use('/api', actors_1.default);
// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
// API route for fetching films data
app.get('/api/films', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch films data from the database
        const films = yield (0, db_1.getFilmsFromDatabase)();
        res.json(films);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
const promise_1 = __importDefault(require("mysql2/promise"));
const db = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'roottoor',
    database: 'sakila'
});
app.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows, fields] = yield db.query('SELECT * FROM actor');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
}));
exports.default = app;
