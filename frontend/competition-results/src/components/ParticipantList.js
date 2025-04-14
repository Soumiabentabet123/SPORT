import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ParticipantList() {
  const { competitionName, courseName } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');

  // Fonction pour convertir un temps en secondes
  const convertTimeToSeconds = (time) => {
    if (time === undefined || time === null || time === "" || time === 0 || time === "00s" || time === "Non parti" || time === "00:00:00.00") {
      return Infinity; 
    }
    if (typeof time === 'number') return time;
  
    // Si le temps est une chaîne au format "HH:MM:SS" ou "MM:SS"
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

  // Récupérer les participants et la liste des courses
  useEffect(() => {
    // Récupérer les participants de la course actuelle
    axios.get(`http://localhost:5000/competitions/${competitionName}/courses/${courseName}/participants`)
      .then(response => {
        // Filtrer les participants avec temps valides (exclure 0, "00s", "Non parti")
        const validParticipants = response.data.filter(p => 
          p.Temps !== 0 && p.Temps !== "00s" && p.Temps !== "Non parti" && p.Temps !== "00:00:00.00"
        );
        // Récupérer les participants non partis ou avec temps invalides
        const nonPartis = response.data.filter(p => 
          p.Temps === 0 || p.Temps === "00s" || p.Temps === "Non parti" || p.Temps === "00:00:00.00"
        );
        // Combiner les deux listes (valides d'abord, non partis à la fin)
        setParticipants([...validParticipants, ...nonPartis]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des participants:', error);
        setError(error);
        setLoading(false);
      });

    // Récupérer la liste des courses de la compétition
    axios.get(`http://localhost:5000/competitions/${competitionName}/courses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des courses:', error);
      });
  }, [competitionName, courseName]);

  // Trier les participants par temps (valides d'abord, non partis à la fin)
  const sortedParticipants = [...participants].sort((a, b) => {
    const aTime = convertTimeToSeconds(a.Temps);
    const bTime = convertTimeToSeconds(b.Temps);

    // Si a ou b a un temps invalide, les placer à la fin
    if (aTime === Infinity && bTime === Infinity) return 0; // Les deux sont invalides, pas de changement d'ordre
    if (aTime === Infinity) return 1; // a est invalide, placer à la fin
    if (bTime === Infinity) return -1; // b est invalide, placer à la fin

    return aTime - bTime; // Trie par temps croissant
  });

  // Calculer les positions
  const participantsWithPosition = sortedParticipants.map((participant, index) => {
    const isNonParti = participant.Temps === 0 || participant.Temps === "00s" || participant.Temps === "Non parti" || participant.Temps === "00:00:00.00";
    // Les non partis ont une position après les participants valides
    const position = isNonParti ? 
      sortedParticipants.filter(p => convertTimeToSeconds(p.Temps) !== Infinity).length + index + 1 : 
      index + 1;
    return { ...participant, position };
  });

  // Filtrage des participants par recherche et par sexe
  const filteredParticipants = participantsWithPosition.filter(participant => {
    const matchesSearchTerm = 
      (participant.Nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (participant.Prénom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (participant.Club?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesGender = 
      genderFilter === 'all' || 
      (genderFilter === 'male' && participant.Sexe === 'M') || 
      (genderFilter === 'female' && participant.Sexe === 'F');

    return matchesSearchTerm && matchesGender;
  });

  // Affichage du chargement
  if (loading) return <div>Chargement...</div>;

  // Affichage des erreurs
  if (error) return <div style={{ color: 'red', fontWeight: 'bold' }}>Erreur : Impossible de charger les participants.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Classement - {courseName} ({competitionName})</h2>

      {/* Boutons pour accéder aux autres courses */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Autres courses de la compétition :</h3>
        {courses.map((course, index) => (
          <button
            key={index}
            onClick={() => navigate(`/competitions/${competitionName}/courses/${course.name}`)}
            style={{
              ...styles.button,
              marginRight: '10px',
              marginBottom: '10px',
              backgroundColor: course.name === courseName ? '#007bff' : '#f4f4f4',
              color: course.name === courseName ? '#fff' : '#333',
            }}
          >
            {course.name}
          </button>
        ))}
      </div>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un participant par nom, prénom ou club..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '300px', fontSize: '16px' }}
      />

      {/* Boutons de filtre par sexe */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setGenderFilter('all')} 
          style={genderFilter === 'all' ? { ...styles.button, ...styles.activeButton } : styles.button}
        >
          Tous
        </button>
        <button 
          onClick={() => setGenderFilter('male')} 
          style={genderFilter === 'male' ? { ...styles.button, ...styles.activeButton } : styles.button}
        >
          Hommes
        </button>
        <button 
          onClick={() => setGenderFilter('female')} 
          style={genderFilter === 'female' ? { ...styles.button, ...styles.activeButton } : styles.button}
        >
          Femmes
        </button>
      </div>

      {/* Tableau des participants */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Nom</th>
            <th style={styles.th}>Prénom</th>
            <th style={styles.th}>Club</th>
            <th style={styles.th}>Temps</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.length > 0 ? (
            filteredParticipants.map((participant, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={styles.td}>{participant.position}</td>
                <td style={styles.td}>{participant.Nom}</td>
                <td style={styles.td}>{participant.Prénom}</td>
                <td style={styles.td}>{participant.Club || 'N/A'}</td>
                <td style={styles.td}>
                  {participant.Temps === 0 || participant.Temps === "00s" || participant.Temps === "Non parti" || participant.Temps === "00:00:00.00" ? (
                    <span className="text-muted fst-italic">Non parti</span>
                  ) : (
                    participant.Temps
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>Aucun participant trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Styles pour le tableau et les boutons
const styles = {
  th: { padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' },
  td: { padding: '10px', textAlign: 'left' },
  button: { 
    padding: '8px 16px', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer', 
    fontSize: '14px',
  },
  activeButton: {
    backgroundColor: '#007bff',
    color: '#fff'
  }
};

export default ParticipantList;
