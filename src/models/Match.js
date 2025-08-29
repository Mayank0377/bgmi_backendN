import mongoose from 'mongoose';
const { Schema } = mongoose;

const MatchResultSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    placement: { type: Number, required: true },
    kills: { type: Number, required: true },
});

const MatchSchema = new Schema({
    tournament: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
    day: { type: Number, required: true },
    matchNumber: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
    results: [MatchResultSchema],
});

const Match = mongoose.model('Match', MatchSchema);
export default Match;