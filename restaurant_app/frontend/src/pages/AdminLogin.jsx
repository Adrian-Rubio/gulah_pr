import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple logic for now, later we'll connect to the backend
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="login-page">
            <div className="glass-card login-card fade-in">
                <div className="login-header">
                    <Lock size={32} color="var(--primary)" />
                    <h2>Acceso Marketing</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <button type="submit" className="btn-primary w-full">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
