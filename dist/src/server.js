#!/usr/bin/env node
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
const routes_1 = __importDefault(require("./routes"));
const actors_1 = __importDefault(require("./actors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//import { getFilmsFromDatabase } from './db';
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
//@ts-ignore
app.use((0, cors_1.default)({ 'Access-Control-Allow-Origin': '*' }));
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static('public'));
app.use('/api', routes_1.default);
app.use('/api', actors_1.default);
// Serve index.html for the root URL
/*app.get('/', (req:Request, res:Response) => {

  });*/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
const promise_1 = __importDefault(require("mysql2/promise"));
var fs = require('fs');
const db = promise_1.default.createPool({
    host: 'tsiprojectsql.mysql.database.azure.com',
    user: 'admin1',
    password: 'Password1',
    database: 'sakila',
    ssl: {
        ca: fs.readFileSync('dist/src/DigiCertGlobalRootCA.crt.pem')
    }
});
// API route for fetching films data
app.get('/api/films', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch films data from the database
        const [films, _] = yield db.query('SELECT * FROM film');
        res.json(films);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows, fields] = yield db.query('SELECT * FROM actor');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database error1');
    }
}));
exports.default = app;
