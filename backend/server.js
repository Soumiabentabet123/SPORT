import cors from 'cors';
import express from 'express';
import connectDB from './db.js';
import competitionRoutes from './routes/competitionRoutes.js';

const app = express();
const PORT =5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/competitions',competitionRoutes);

app.listen(PORT,() => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});