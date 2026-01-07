import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

const Home = () => {
    const { siteConfig } = useConfig();

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h2 className="fade-in">{siteConfig.welcomeTitle}</h2>
                    <p className="fade-in-delay">{siteConfig.welcomeSubtitle}</p>
                    <div className="hero-actions fade-in-delay-2">
                        <Link to="/menu" className="btn-primary">Ver la Carta <ArrowRight size={18} /></Link>
                        <Link to="/reservations" className="btn-secondary">Reservar Mesa</Link>
                    </div>
                </div>
                <div className="hero-image-container">
                    <img src="/hero-restaurant.png" alt="Interior del restaurante" className="hero-image" />
                    <div className="glass-card hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">4.9</span>
                            <span className="stat-label">Google Reviews</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">15+</span>
                            <span className="stat-label">Años de Calidad</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured-info">
                <div className="info-card glass-card">
                    <h3>Horario</h3>
                    <p>Lunes - Viernes: 13:00 - 23:00</p>
                    <p>Sábados - Domingos: 12:00 - 00:00</p>
                </div>
                <div className="info-card glass-card">
                    <h3>Ubicación</h3>
                    <p>Calle Gastronomía 123</p>
                    <p>Madrid, España</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
