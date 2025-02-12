import { Schema, model } from "mongoose";

const participantSchema = new Schema({
  Nom: { type: String, required: true },
  Prénom: { type: String, required: true }, 
  Sexe: { type: String, required: true }, 
  Numéro: { type: String, required: true }, 
  Temps: { type: String }, 
  Classement: { type: String }, 
  "Classement Par Cat.": { type: String },
  "Classement Par Sexe": { type: String }, 
  Course: { type: String, required: true }, 
  Distance: { type: String, required: true }, 
});

const Participant = model("Participant", participantSchema);

export default Participant;