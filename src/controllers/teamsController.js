import Team from '../models/Team.js';

export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().sort({ name: 1 });
        res.json(teams);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const createTeam = async (req, res) => {
    const { name, logo, members } = req.body;
    try {
        let team = await Team.findOne({ name });
        if (team) {
            return res.status(400).json({ msg: 'Team with this name already exists' });
        }
        const newTeam = new Team({ name, logo, members });
        team = await newTeam.save();
        res.status(201).json(team);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const createMultipleTeams = async (req, res) => {
    const { teams } = req.body;

    if (!teams || !Array.isArray(teams) || teams.length === 0) {
        return res.status(400).json({ msg: 'Please provide an array of teams.' });
    }

    try {
        const createdTeams = await Team.insertMany(teams, { ordered: false });
        res.status(201).json(createdTeams);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error: Could not create teams. Check for duplicate names.' });
    }
};