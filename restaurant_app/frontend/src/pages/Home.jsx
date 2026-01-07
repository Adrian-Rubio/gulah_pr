import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import MarqueeBanner from '../components/MarqueeBanner';

const Home = () => {
    const { siteConfig } = useConfig();

    return (
        <div className="home-page fade-in">
            <MarqueeBanner />

            <section className="hero">
                <div className="hero-content">
                    <h2 className="fade-in">
                        {(() => {
                            const words = siteConfig.welcomeTitle.split(' ');
                            if (words.length > 1) {
                                return (
                                    <>
                                        <span>{words[0]}</span> {words.slice(1).join(' ')}
                                    </>
                                );
                            }
                            return siteConfig.welcomeTitle;
                        })()}
                    </h2>
                    <p className="fade-in-delay">{siteConfig.welcomeSubtitle}</p>
                    <div className="hero-actions fade-in-delay-2">
                        <Link to="/menu" className="btn-primary">Ver la Carta <ArrowRight size={18} /></Link>
                        <Link to="/reservations" className="btn-secondary">Reservar Mesa</Link>
                    </div>
                </div>
                <div className="hero-image-container fade-in-delay">
                    <img src="/images/home-hero-new.jpg" alt="Plato estrella Gulah" className="hero-image" />
                    <div className="glass-card hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">4.9</span>
                            <span className="stat-label">Google Reviews</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">100%</span>
                            <span className="stat-label">Pasión</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured-info fade-in-delay-2">
                <div className="info-card glass-card">
                    <h3>Horario</h3>
                    <p>{siteConfig.hours || 'Lunes - Domingo: 13:00 - 00:00'}</p>
                </div>
                <div className="info-card glass-card">
                    <h3>Ubicación</h3>
                    <p>{siteConfig.address || 'Calle Gastronomía 123, Madrid'}</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
