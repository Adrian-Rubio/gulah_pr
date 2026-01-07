import { MapPin, Phone, Mail, Instagram, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import EditableText from './Editable/EditableText';

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
                            <MapPin size={18} color="var(--primary)" />
                            <EditableText configKey="address" />
                        </li>
                        <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-muted)' }}>
                            <Phone size={18} color="var(--primary)" />
                            <EditableText configKey="phone" />
                        </li>
                        <li style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-muted)' }}>
                            <Mail size={18} color="var(--primary)" />
                            <EditableText configKey="email" />
                        </li>
                        <li style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', color: 'var(--text-muted)' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text)' }}>Grupos:</span>
                            <EditableText configKey="reservation_email" />
                        </li>
                    </ul>
                </div>

                <div className="footer-hours">
                    <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase' }}>Horario</h4>
                    <EditableText configKey="hours" tag="p" style={{ color: 'var(--text-muted)' }} />
                </div>

                <div className="footer-social">
                    <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase' }}>Síguenos</h4>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a
                            href="https://www.instagram.com/gulah_poboys/?hl=es"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'var(--text)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none',
                                fontWeight: '600'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.color = 'var(--text)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Instagram size={28} />
                            <span>@gulah_poboys</span>
                        </a>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '4rem', paddingOver: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative' }}>
                <p>&copy; {new Date().getFullYear()} Gulah Restaurant. Todos los derechos reservados.</p>
                <Link to="/admin" className="admin-gear" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}>
                    <Settings size={20} />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
