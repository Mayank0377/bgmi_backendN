import Tournament from '../models/Tournament.js';
import Match from '../models/Match.js';


const calculateStandings = (matches) => {
    const placementPoints = {
        1: 10, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 1
    };

    const standingsMap = new Map();

    matches.forEach(match => {
        if (match.isCompleted && match.results) {
            match.results.forEach(result => {
                
                if (result.team && result.team._id) {
                    const teamIdString = result.team._id.toString();

                    if (!standingsMap.has(teamIdString)) {
                        standingsMap.set(teamIdString, {
                            id: result.team._id,
                            name: result.team.name,
                            logo: result.team.logo,
                            matchesPlayed: 0,
                            totalPoints: 0,
                            killPoints: 0,
                            placementPoints: 0,
                            wwcdCount: 0,
                        });
                    }

                    const teamStanding = standingsMap.get(teamIdString);

                    const pPoints = placementPoints[result.placement] || 0;

                    teamStanding.killPoints += result.kills;
                    teamStanding.placementPoints += pPoints;
                    teamStanding.totalPoints += result.kills + pPoints;
                    teamStanding.matchesPlayed += 1;

                    if (result.placement === 1) {
                        teamStanding.wwcdCount += 1;
                    }
                }
            });
        }
    });

    const finalStandings = Array.from(standingsMap.values());
    return finalStandings.sort((a, b) => b.totalPoints - a.totalPoints || b.killPoints - a.killPoints);
};


export const getTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id)
            .populate('teams')
            .populate({
                path: 'matches',
                populate: { path: 'results.team', model: 'Team' }
            });

        if (!tournament) return res.status(404).json({ msg: 'Tournament not found' });

        const overallStandings = calculateStandings(tournament.matches);

        res.json({ tournament, overallStandings });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const getAllTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().sort({ startDate: -1 });
        if (req.query.flat === 'true') return res.json(tournaments);

        const now = new Date();
        const categorized = {
            live: tournaments.filter(t => t.status === 'active'),
            upcoming: tournaments.filter(t => t.status === 'upcoming' && new Date(t.startDate) > now),
            completed: tournaments.filter(t => t.status === 'completed' || (t.status !== 'upcoming' && new Date(t.endDate) < now)),
        };
        res.json(categorized);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const createTournament = async (req, res) => {
    try {
        const { teams, matchesPerDay, days, ...tournamentData } = req.body;
        const newTournament = new Tournament({ ...tournamentData, teams, matchesPerDay, days });
        const savedTournament = await newTournament.save();

        const matchesToCreate = [];
        for (let d = 1; d <= days; d++) {
            for (let m = 1; m <= matchesPerDay; m++) {
                matchesToCreate.push({
                    tournament: savedTournament._id,
                    day: d,
                    matchNumber: m,
                });
            }
        }
        const createdMatches = await Match.insertMany(matchesToCreate);
        savedTournament.matches = createdMatches.map(m => m._id);
        await savedTournament.save();
        res.status(201).json(savedTournament);
    } catch (err) {
        console.error("Error creating tournament:", err.message);
        res.status(500).send('Server Error: Could not create tournament.');
    }
};

export const updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(tournament);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const updateMatchResults = async (req, res) => {
    try {
        const { results } = req.body;
        const formattedResults = results.map(r => ({ ...r, team: r.teamId }));
        const match = await Match.findByIdAndUpdate(req.params.matchId, { results: formattedResults, isCompleted: true }, { new: true });
        if (!match) return res.status(404).json({ msg: 'Match not found' });
        res.json(match);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};