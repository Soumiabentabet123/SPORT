import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { getCompetitions } from '../api';
import '../styles.css';
import Navbar from './Navbar';

function CompetitionList() {
    const [competitions, setCompetitions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCompetitions, setFilteredCompetitions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const data = await getCompetitions();
                setCompetitions(data);
                setFilteredCompetitions(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching competitions:", error);
                setIsLoading(false);
            }
        };
        fetchCompetitions();
    }, []);

    useEffect(() => {
        const results = competitions.filter((competition) =>
            competition.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompetitions(results);
    }, [searchTerm, competitions]);

    const CompetitionRow = ({ competition }) => {
        // Fonction pour vérifier si la date est valide
        const isValidDate = (dateString) => {
            if (!dateString) return false;
            
            // Gestion des dates au format DD/MM/YYYY
            if (typeof dateString === 'string' && dateString.includes('/')) {
                const parts = dateString.split('/');
                if (parts.length === 3) {
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const year = parseInt(parts[2], 10);
                    
                    const date = new Date(year, month, day);
                    return date.getFullYear() === year && 
                           date.getMonth() === month && 
                           date.getDate() === day;
                }
            }
            
            // Pour les autres formats
            const date = new Date(dateString);
            return !isNaN(date.getTime());
        };

        // Formater la date pour l'affichage détaillé
        const formatDate = (dateString) => {
            if (!isValidDate(dateString)) return 'Date à confirmer';
            
            let date;
            if (typeof dateString === 'string' && dateString.includes('/')) {
                const [day, month, year] = dateString.split('/');
                date = new Date(year, month - 1, day);
            } else {
                date = new Date(dateString);
            }
            
            const options = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric'
            };
            return date.toLocaleDateString('fr-FR', options);
        };

        // Obtenir les parties de la date pour l'affichage visuel
        const getDateParts = (dateString) => {
            if (!isValidDate(dateString)) {
                return {
                    day: '--',
                    number: '--',
                    month: '---',
                    year: '----'
                };
            }
            
            let date;
            if (typeof dateString === 'string' && dateString.includes('/')) {
                const [day, month, year] = dateString.split('/');
                date = new Date(year, month - 1, day);
            } else {
                date = new Date(dateString);
            }
            
            return {
                day: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
                number: date.getDate(),
                month: date.toLocaleDateString('fr-FR', { month: 'short' }),
                year: date.getFullYear()
            };
        };

        const dateParts = getDateParts(competition.date);

        return (
            <Link to={`/competitions/${competition.name}`} className="competition-row">
                <div className={`date-container ${!isValidDate(competition.date) ? 'invalid' : ''}`}>
                    <div className="date-day">{dateParts.day}</div>
                    <div className="date-main">
                        <div className="date-number">{dateParts.number}</div>
                        <div className="date-month">{dateParts.month}</div>
                    </div>
                    <div className="date-year">{dateParts.year}</div>
                </div>
                
                <div className="row-main">
                    <h3 className="competition-name">{competition.name}</h3>
                    <div className="competition-details">
                        <span className="detail-item">
                            <FiCalendar className="detail-icon" />
                            {formatDate(competition.date)}
                        </span>
                        <span className="detail-item">
                            <FiMapPin className="detail-icon" />
                            {competition.ville || 'Lieu non précisé'}
                        </span>
                    </div>
                </div>
                <div className="row-action">
                    <FiArrowRight className="action-arrow" />
                </div>
            </Link>
        );
    };

    return (
        <div className="sport-app-container">
            <div className="hero-panorama">
                <div className="hero-content">
                    <h1>Résultats Sportifs</h1>
                    <p>Suivez les compétitions en temps réel</p>
                    
                    <div className="search-container">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Rechercher une compétition..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <main className="main-content">
                <div className="container">
                    {isLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Chargement des compétitions...</p>
                        </div>
                    ) : (
                        <>
                            <div className="section-header">
                                <h2>Compétitions en cours</h2>
                                <span className="results-count">{filteredCompetitions.length} résultats</span>
                            </div>

                            <div className="competitions-list">
                                {filteredCompetitions.length > 0 ? (
                                    filteredCompetitions.map((competition) => (
                                        <CompetitionRow 
                                            key={`${competition.name}-${competition.date}`}
                                            competition={competition}
                                        />
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <img src="/assets/no-results.svg" alt="Aucun résultat" />
                                        <h3>Aucune compétition trouvée</h3>
                                        <p>Modifiez vos critères de recherche</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <footer className="app-footer">
                <div className="footer-content">
                    <p>© {new Date().getFullYear()} Résultats sportifs - Tous droits réservés</p>
                    <div className="footer-links">
                        <Link to="/mentions-legales">Mentions légales</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default CompetitionList;