import { useState, useEffect } from 'react';
import { LayoutDashboard, Utensils, Calendar, Settings, Save } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const AdminDashboard = () => {
    const { siteConfig, setSiteConfig } = useConfig();
    const [activeTab, setActiveTab] = useState('config');
    const [siteParams, setSiteParams] = useState(siteConfig);

    const handleSave = () => {
        setSiteConfig(siteParams);
        alert('Configuración guardada y aplicada!');
    };

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h3>Panel de Control</h3>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={activeTab === 'config' ? 'active' : ''}
                        onClick={() => setActiveTab('config')}
                    >
                        <Settings size={20} /> Configuración Web
                    </button>
                    <button
                        className={activeTab === 'menu' ? 'active' : ''}
                        onClick={() => setActiveTab('menu')}
                    >
                        <Utensils size={20} /> Gestionar Carta
                    </button>
                    <button
                        className={activeTab === 'reservations' ? 'active' : ''}
                        onClick={() => setActiveTab('reservations')}
                    >
                        <Calendar size={20} /> Reservas
                    </button>
                </nav>
            </aside>

            <main className="admin-content">
                <header className="content-header">
                    <h2>{activeTab === 'config' ? 'Configuración de la Interfaz' :
                        activeTab === 'menu' ? 'Gestión de la Carta' : 'Control de Reservas'}</h2>
                    <button className="btn-primary" onClick={handleSave}><Save size={18} /> Guardar Cambios</button>
                </header>

                {activeTab === 'config' && (
                    <div className="glass-card config-form fade-in">
                        <div className="form-group">
                            <label>Título de Bienvenida (Home)</label>
                            <input
                                type="text"
                                value={siteParams.welcomeTitle}
                                onChange={(e) => setSiteParams({ ...siteParams, welcomeTitle: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subtítulo de Bienvenida</label>
                            <textarea
                                rows="3"
                                value={siteParams.welcomeSubtitle}
                                onChange={(e) => setSiteParams({ ...siteParams, welcomeSubtitle: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Color Principal de la Marca</label>
                            <div className="color-picker-wrapper">
                                <input
                                    type="color"
                                    value={siteParams.primaryColor}
                                    onChange={(e) => setSiteParams({ ...siteParams, primaryColor: e.target.value })}
                                />
                                <span>{siteParams.primaryColor}</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div className="placeholder-content glass-card">
                        <p>Aquí se listarán los platos de la carta para editar precios e imágenes.</p>
                    </div>
                )}

                {activeTab === 'reservations' && (
                    <div className="placeholder-content glass-card">
                        <p>Aquí se visualizarán las reservas realizadas por los clientes.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
