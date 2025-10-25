import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import subscribeRoute from './api/subscribe.js';

const app = express();
const PORT = 3001;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());


app.use('/api/subscribe', subscribeRoute);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

