import express from 'express'
import {getCompetitions , getCoursesByCompetition , getParticipantsByCourse} from '../controllers/competitionController.js';


const router = express.Router();

router.get('/',getCompetitions); 
router.get('/:competitionName/courses', getCoursesByCompetition); 
router.get('/:competitionName/courses/:courseName/participants', getParticipantsByCourse);


export default router;