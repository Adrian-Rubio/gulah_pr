import { ExternalLink } from 'lucide-react';

const Reservations = () => {
    const COVER_MANAGER_URL = "https://www.covermanager.com/reserve/module_restaurant/restaurante-gulah/spanish";

    const bgImages = [
        "/images/Wings.jpeg",
        "/images/PHILLY CHEESESTEAK.jpeg",
        "/images/nachos gulah.jpeg",
        "/images/toro loco.jpeg",
        "/images/pulled pork.jpeg",
        "/images/alitas infierno.jpeg",
        "/images/brutus choice.jpeg",
        "/images/higo & roll.jpeg"
    ];

    return (
        <div className="reservations-page fade-in">
            <div className="page-header">
                <h2 className="bold-title">¿TIENES HAMBRE DE FUEGO?</h2>
                <p className="subtitle">Reserva tu mesa y déjate llevar por el sabor más salvaje.</p>
            </div>

            <div className="reservations-hero-container">
                <div className="reservations-bg-animation">
                    {bgImages.map((src, i) => (
                        <img key={i} src={src} alt="" />
                    ))}
                </div>

                <div className="reservation-cta-card fade-in">
                    <a
                        href={COVER_MANAGER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        RESERVAR MESA <ExternalLink size={20} />
                    </a>
                    <p style={{ marginTop: '2rem', color: '#2d2d2d', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Gestionado por <span style={{ color: '#ff4a1f' }}>CoverManager</span>
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', color: '#666' }}>
                <p>También puedes llamarnos al <span style={{ color: '#2d2d2d', fontWeight: 'bold' }}>+34 912 345 678</span></p>
            </div>
        </div>
    );
};

export default Reservations;
