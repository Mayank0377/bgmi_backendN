import mongoose from "mongoose";
const { Schema } = mongoose;

const TournamentSchema = new Schema(
    {
        name: { type: String, required: true },
        status: {
            type: String,
            enum: ["upcoming", "active", "completed", "cancelled"],
            default: "upcoming",
        },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        prizePool: { type: String, required: true },
        entryFee: { type: String, default: "Free" },
        maxTeams: { type: Number, default: 16 },
        description: { type: String, default: "" },
        rules: { type: String, default: "" },
        gameMode: { type: String, default: "Squad" },
        days: { type: Number, required: true },
        matchesPerDay: { type: Number, required: true },
        teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
        matches: [{ type: Schema.Types.ObjectId, ref: "Match" }],
    },
    { timestamps: true }
);

const Tournament = mongoose.model("Tournament", TournamentSchema);
export default Tournament;
