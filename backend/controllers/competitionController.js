
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

        
        if (!competitionName || !courseName) {
            return res.status(400).json({ error: "Competition name and course name are required." });
        }

        
        const participants = await Participant.find({
            Competition: competitionName,
            Course: courseName
        }).select("Nom Prénom Club"); 

        // Vérification si des participants ont été trouvés
        if (!participants.length) {
            return res.status(404).json({ message: "No participants found for this course." });
        }

        // Réponse avec les données
        res.json(participants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


