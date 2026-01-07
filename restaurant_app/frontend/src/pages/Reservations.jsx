import { ExternalLink } from 'lucide-react';
import EditableText from '../components/Editable/EditableText';
import EditableButton from '../components/Editable/EditableButton';

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
                <EditableText configKey="reservationsTitle" tag="h2" className="bold-title" />
                <EditableText configKey="reservationsSubtitle" tag="p" className="subtitle" />
            </div>

            <div className="reservations-hero-container">
                <div className="reservations-bg-animation">
                    {bgImages.map((src, i) => (
                        <img key={i} src={src} alt="" />
                    ))}
                </div>

                <div className="reservation-cta-card fade-in">
                    <EditableButton
                        configKey="reservationsBtn"
                        defaultText="RESERVAR MESA"
                        defaultLink={COVER_MANAGER_URL}
                        className="btn-primary"
                    />
                    <p style={{ marginTop: '2rem', color: '#2d2d2d', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Gestionado por <span style={{ color: '#ff4a1f' }}>CoverManager</span>
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', color: '#666' }}>
                <EditableText configKey="reservationsPhone" tag="p" />
            </div>
        </div>
    );
};

export default Reservations;
