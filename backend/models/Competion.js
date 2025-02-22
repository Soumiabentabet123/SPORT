import mongoose from 'mongoose';

const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Competition =mongoose.model('Competition',CompetitionSchema);
export default Competition