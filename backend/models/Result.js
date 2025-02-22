import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    Competition: { type: String, required: true },
   
}, { strict: false }); // Use strict: false if your results collection has dynamic fields

const Result = mongoose.model('Result', resultSchema);

export default Result;