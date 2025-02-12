import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://hajarnajam:hajarhajar123@sitesportif.fpfdh.mongodb.net/SiteSportif?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully 🚀'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Define the schema
const participantSchema = new mongoose.Schema({
  _id: String,
  Nom: String,
  Prénom: String,
  Adresse1: String,
  Adresse2: String,
  Code: String,
  Ville: String,
  Etat: String,
  Pays: String,
  Tel: String,
  Sexe: String,
  Numéro: String,
  Licence: String,
  "Type Licence": String,
  Naissance: String,
  DateNaissance: String,
  Catégorie: String,
  "Nom Catégorie": String,
  "Abbrev. Catégorie": String,
  Nation: String,
  Club: String,
  "Code Club": String,
  Competition: String,
  "Type Compet.": String,
  "Ville Compet.": String,
  "Code Ville Compet.": String,
  "DateCompet.": String,
  Course: String,
  Distance: String,
  HeureDépartCourse: String,
  DétectionsAutorisées: String,
  Temps: String,
  "Nb.Secondes": String,
  "Temps Arrondi": String,
  "Nb.Secondes Arrondi": String,
  "Nb.Heures Arrondi": String,
  Classement: String,
  "Classement Par Cat.": String,
  "Classement Par Sexe": String,
  Organisme: String,
  Payé: String,
  Invité: String,
  "Certif Médical": String,
  RGPD: String,
  "Pris Départ": String,
  Abandon: String,
  Disqualifié: String,
  Qualifié: String,
  "Envoi Classt": String,
  Handicap: String,
  ID: String,
  Sponsor: String,
  Palmarès: String,
  EMail: String,
  "Pass Compétition": String,
  Pénalité: String,
  "Pénalité-Manuelle": String,
  "Pénalité-Auto": String,
  "#U1": String,
  "#U2": String,
  "#U3": String,
  "#U4": String,
  "#U5": String,
  "#U6": String,
  "#U7": String,
  "#U8": String,
  "#U9": String,
  "#U10": String,
  "#U11": String,
  "#U12": String,
  "#U13": String,
  "#U14": String,
  "#U15": String,
  "#U16": String,
  "#U17": String,
  "#U18": String,
  "#U19": String,
  "#U20": String,
  "#U21": String,
  "#U22": String,
  "#U23": String,
  "#U24": String,
  "#U25": String,
  "NbPassage 31": String,
  file_name: String,
}, { strict: false });

// Create the model
const Result = mongoose.model('Result', participantSchema, 'results'); // Ensure this matches your collection name

// API endpoint to fetch results
app.get('/api/results', async (req, res) => {
  try {
    console.log('Fetching results...');

    // Log the collection name
    console.log('Collection name:', Result.collection.name);

    // Fetch data from MongoDB
    const results = await Result.find();
    console.log('Results:', results);

    if (results.length === 0) {
      console.warn('No documents found in the collection.');
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});