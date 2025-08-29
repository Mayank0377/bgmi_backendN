import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getAllTeams, createTeam } from '../controllers/teamsController.js';
import { createMultipleTeams } from '../controllers/teamsController.js';

const router = express.Router();

router.get('/', getAllTeams);
router.post('/', authMiddleware, createTeam);
router.post('/bulk', authMiddleware, createMultipleTeams);

export default router;