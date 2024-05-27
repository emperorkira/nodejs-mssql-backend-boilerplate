import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

import {testlist} from './testlist.js'

app.use(express.static(path.join(__dirname, "public", "images")));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "autoplay=(*)");
  next();
});

// Use CORS middleware
app.use(cors({ 
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Handle preflight requests
app.options('/*', (req, res) => {
  res.status(204).end();
});

testlist();

export default app;
