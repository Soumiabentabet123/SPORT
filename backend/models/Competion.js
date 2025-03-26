import mongoose from 'mongoose';

const CompetitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    Ville_Compet: String,       
    Date_Compet: String        
});

const Competition = mongoose.model('Competition', CompetitionSchema);
export default Competition;