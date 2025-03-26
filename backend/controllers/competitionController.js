import Participant from '../models/Result.js';

export const getCompetitions = async (req, res) => {
    try {
        // Get distinct combinations of Competition, Date_Compet, and Ville_Compet
        const competitions = await Participant.aggregate([
            {
                $group: {
                    _id: "$Competition",        // Group by competition name
                    date: { $first: "$Date_Compet" },    // Get the first Date_Compet
                    ville: { $first: "$Ville_Compet" }   // Get the first Ville_Compet
                }
            },
            {
                $project: {
                    name: "$_id",  // Rename _id to name
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

        if (!competitionName || !courseName) {
            return res.status(400).json({ error: "Competition name and course name are required." });
        }

        const participants = await Participant.find({
            Competition: competitionName,
            Course: courseName
        }).select("Nom Prénom Club");

        if (!participants.length) {
            return res.status(404).json({ message: "No participants found for this course." });
        }

        res.json(participants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};