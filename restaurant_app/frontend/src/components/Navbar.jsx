import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <UtensilsCrossed size={24} />
                <Link to="/">GOLDEN FORK</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/menu">Carta</Link></li>
                <li><Link to="/reservations">Reservas</Link></li>
                <li><Link to="/blog">Eventos</Link></li>
                <li><Link to="/admin" className="admin-link">Admin</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
