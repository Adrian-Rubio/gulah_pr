import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'Inicio', path: '/' },
        { name: 'Carta', path: '/menu' },
        { name: 'Reservas', path: '/reservations' },
        { name: 'Eventos', path: '/events' },
    ];

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/" onClick={() => setIsOpen(false)}>
                    <img src="/images/logo.png" alt="Gulah Logo" style={{ height: '45px', width: 'auto' }} />
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className="nav-links desktop-only">
                {links.map(link => (
                    <li key={link.path}>
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={toggleMenu}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="mobile-nav-links">
                            {links.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} onClick={() => setIsOpen(false)}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

