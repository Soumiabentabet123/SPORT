import Participant from '../models/Result.js';

// Convertir un temps texte en secondes pour le tri
const convertTimeToSeconds = (time) => {
    if (!time || typeof time !== 'string') return Infinity;
    const parts = time.split(':');
    if (parts.length === 3) {
        const [hours, minutes, seconds] = parts.map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
        const [minutes, seconds] = parts.map(Number);
        return minutes * 60 + seconds;
    }
    return Infinity;
};

// 📌 Récupérer toutes les compétitions + leur date et ville
export const getCompetitions = async (req, res) => {
    try {
        const competitions = await Participant.aggregate([
            {
                $group: {
                    _id: "$Competition",
                    date: { $first: "$Date_Compet" },
                    ville: { $first: "$Ville_Compet" }
                }
            },
            {
                $project: {
                    name: "$_id",
                    date: 1,
                    ville: 1
                }
            }
        ]);
        res.json(competitions);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        const { sexe } = req.query;

        if (!competitionName || !courseName) {
            return res.status(400).json({ error: "Competition name and course name are required." });
        }

        const query = { Competition: competitionName, Course: courseName };
        if (sexe) query.Sexe = sexe;

        const participants = await Participant.find(query).select("Nom Prénom Club Temps Sexe");

        // Tri par temps réel (les "temps invalides" vont à la fin)
        const sortedParticipants = [...participants].sort((a, b) => {
            const aTime = convertTimeToSeconds(a.Temps);
            const bTime = convertTimeToSeconds(b.Temps);

            if (aTime === Infinity && bTime === Infinity) return 0;
            if (aTime === Infinity) return 1;
            if (bTime === Infinity) return -1;
            return aTime - bTime;
        });

        // Ajouter une position et corriger Temps manquant
        const participantsWithPosition = sortedParticipants.map((participant, index) => ({
            ...participant.toObject(),
            Temps: participant.Temps !== undefined && participant.Temps !== null ? participant.Temps : "00s",
            Position: index + 1
        }));

        if (!participantsWithPosition.length) {
            return res.status(404).json({ message: "No participants found for this course." });
        }

        res.json(participantsWithPosition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
