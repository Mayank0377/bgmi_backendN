import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    getAllTournaments, getTournamentById, createTournament,
    updateTournament, updateMatchResults
} from '../controllers/tournamentsController.js';

const router = express.Router();

router.get('/', getAllTournaments);
router.get('/:id', getTournamentById);
router.post('/', authMiddleware, createTournament);
router.put('/:id', authMiddleware, updateTournament);
router.put('/:id/matches/:matchId', authMiddleware, updateMatchResults);

export default router;