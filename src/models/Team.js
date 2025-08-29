import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    logo: { type: String, default: '🏆' },
    members: [String],
});

const Team = mongoose.model('Team', TeamSchema);
export default Team;