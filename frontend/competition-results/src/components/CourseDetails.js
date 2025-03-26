import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importez l'icône de retour
import { getCourses } from '../api';
import '../styles.css';

const CourseDetails = () => {
  const { competitionName } = useParams();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialisez useNavigate

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses(competitionName);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [competitionName]);

  return (
    <div style={styles.container}>
      {/* Barre de navigation avec icône de retour */}
      <nav style={styles.navbar}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          <FaArrowLeft style={styles.backIcon} /> {/* Icône de retour */}
        </button>
        <h2 style={styles.title}>Courses pour {competitionName}</h2>
      </nav>

      {/* Liste des courses */}
      <div style={styles.grid}>
        {courses.map((course) => (
          <Link
            to={`/competitions/${competitionName}/courses/${course.name}`}
            key={course.name}
            style={styles.card}
          >
            <h3 style={styles.cardTitle}>{course.name}</h3>
            <p style={styles.cardDescription}>Cliquez pour voir les détails</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '10px 0',
    borderBottom: '2px solid #007bff',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginLeft: '20px', 
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textDecoration: 'none',
    color: '#333',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#007bff',
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#666',
    margin: '0',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: '1.5rem',
    color: '#007bff',
    transition: 'color 0.3s',
  },
  backButtonHover: {
    backgroundColor: 'transparent',
  },
  backIconHover: {
    color: '#0056b3', // Changement de couleur au survol
  },
};

export default CourseDetails;