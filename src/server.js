import dotenv from 'dotenv';
dotenv.config({ path: "./.env" }); 
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';

import adminRoutes from './routes/adminRoutes.js';
import tournamentsRoutes from './routes/tournamentsRoutes.js';
import teamsRoutes from './routes/teamsRoutes.js';

const app = express();
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('BGMI BUZZ API Running'));

app.use('/api/admin', adminRoutes);
app.use('/api/tournaments', tournamentsRoutes);
app.use('/api/teams', teamsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server started on http://localhost:${PORT}`));