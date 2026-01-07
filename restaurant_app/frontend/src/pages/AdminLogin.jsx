import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState(localStorage.getItem('rememberedUser') || '');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberMe'));
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/admin/login', {
                username,
                password
            });

            const userData = JSON.stringify(res.data);
            const storage = rememberMe ? localStorage : sessionStorage;

            storage.setItem('user', userData);
            storage.setItem('isAdmin', 'true');

            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberedUser');
                localStorage.removeItem('rememberMe');
            }

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Error de conexión');
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
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ paddingRight: '40px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#666',
                                    padding: '5px'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ width: 'auto', margin: 0 }}
                        />
                        <label htmlFor="rememberMe" style={{ margin: 0, fontSize: '0.9rem', cursor: 'pointer' }}>Recordarme en este equipo</label>
                    </div>
                    {error && <p className="error-text" style={{ marginBottom: '1rem' }}>{error}</p>}
                    <button type="submit" className="btn-primary w-full">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
