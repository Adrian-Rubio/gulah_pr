import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const Footer = () => {
    const { siteConfig } = useConfig();

    return (
        <footer className="glass-card" style={{ marginTop: '5rem', borderRadius: 'var(--radius) var(--radius) 0 0', padding: '4rem 2rem' }}>
            <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
                <div className="footer-brand">
                    <img src="/images/logo.png" alt="Gulah Logo" style={{ height: '50px', marginBottom: '1.5rem', width: 'auto', mixBlendMode: 'multiply' }} />
                    <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
                        Street food salvaje, auténtica y sin filtros. Pasión por el sabor en cada bocado.
                    </p>
                </div>

                <div className="footer-contact">
                    <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase' }}>Contacto</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-muted)' }}>
                            <MapPin size={18} color="var(--primary)" /> {siteConfig.address}
                        </li>
                        <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-muted)' }}>
                            <Phone size={18} color="var(--primary)" /> {siteConfig.phone}
                        </li>
                        <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-muted)' }}>
                            <Mail size={18} color="var(--primary)" /> {siteConfig.email}
                        </li>
                    </ul>
                </div>

                <div className="footer-hours">
                    <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase' }}>Horario</h4>
                    <p style={{ color: 'var(--text-muted)' }}>{siteConfig.hours}</p>
                </div>

                <div className="footer-social">
                    <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase' }}>Síguenos</h4>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--text)', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text)'}><Instagram size={24} /></a>
                        <a href="#" style={{ color: 'var(--text)', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text)'}><Facebook size={24} /></a>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '4rem', paddingOver: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <p>&copy; {new Date().getFullYear()} Gulah Restaurant. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
