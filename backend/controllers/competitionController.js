import Participant from '../models/Result.js';

export const getCompetitions = async(req, res)=>{
    try {
        const competitions = await Participant.distinct('Competition');
        res.json(competitions.map(name =>({name})));
    } catch (err){
        res.status(500).json({error:err.message});
    }
};


export const getCoursesByCompetition = async (req, res) => {
    try {
        const { competitionName } = req.params;

        const courses = await Participant.distinct('Course', { Competition: competitionName });

        res.json(courses.map(name => ({ name }))); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getParticipantsByCourse = async (req, res) => {
    try {
        const { competitionName, courseName } = req.params;
        const { sexe } = req.query; // Récupérer le paramètre de sexe depuis la requête

        if (!competitionName || !courseName) {
            return res.status(400).json({ error: "Competition name and course name are required." });
        }

        // Construire la requête de base
        const query = {
            Competition: competitionName,
            Course: courseName
        };

        // Ajouter le filtre de sexe si le paramètre est présent
        if (sexe) {
            query.Sexe = sexe;
        }

        // Récupérer les participants avec le filtre de sexe si applicable
        const participants = await Participant.find(query).select("Nom Prénom Club Temps Sexe");

        // Trier les participants par leur temps (du plus court au plus long)
        const sortedParticipants = [...participants].sort((a, b) => {
            if (a.Temps === 0) return 1; // Place les participants avec Temps = 0 à la fin
            if (b.Temps === 0) return -1; // Place les participants avec Temps = 0 à la fin
            return a.Temps - b.Temps; // Trie les autres participants par temps croissant
          });

        // Remplacer les temps manquants par "00s"
        const participantsWithDefaultTime = sortedParticipants.map(participant => ({
            ...participant.toObject(), // Convertir le document Mongoose en objet JavaScript
            Temps: participant.Temps || "00s", // Remplacer les temps manquants par "00s"
        }));

        // Vérification si des participants ont été trouvés
        if (!participantsWithDefaultTime.length) {
            return res.status(404).json({ message: "No participants found for this course." });
        }

        // Réponse avec les données triées et les temps manquants remplacés par "00s"
        res.json(participantsWithDefaultTime);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fonction pour convertir un temps au format "HH:MM:SS" ou "MM:SS" en secondes
const convertTimeToSeconds = (time) => {
    const parts = time.split(':');
    if (parts.length === 3) {
        // Format "HH:MM:SS"
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(parts[2], 10);
        return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
        // Format "MM:SS"
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return minutes * 60 + seconds;
    }
    return Infinity; // Si le format est invalide, placer à la fin
};