import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <img src="/images/logo.png" alt="Gulah Logo" style={{ height: '45px', width: 'auto' }} />
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/menu">Carta</Link></li>
                <li><Link to="/reservations">Reservas</Link></li>
                <li><Link to="/events">Eventos</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
