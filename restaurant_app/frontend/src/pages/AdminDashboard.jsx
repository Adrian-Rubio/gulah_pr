import { useState, useEffect } from 'react';
import { LayoutDashboard, Utensils, Calendar, Settings, Save, Trash2, Plus, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import axios from 'axios';

const AdminDashboard = () => {
    const { siteConfig, updateConfigByKey, fetchConfig } = useConfig();
    const [activeTab, setActiveTab] = useState('config');

    // Form states for different sections
    const [heroConfig, setHeroConfig] = useState({
        welcomeTitle: siteConfig.welcomeTitle || '',
        welcomeSubtitle: siteConfig.welcomeSubtitle || ''
    });

    const [contactConfig, setContactConfig] = useState({
        address: siteConfig.address || '',
        phone: siteConfig.phone || '',
        email: siteConfig.email || '',
        reservation_email: siteConfig.reservation_email || '',
        hours: siteConfig.hours || ''
    });

    useEffect(() => {
        setHeroConfig({
            welcomeTitle: siteConfig.welcomeTitle || '',
            welcomeSubtitle: siteConfig.welcomeSubtitle || ''
        });
        setContactConfig({
            address: siteConfig.address || '',
            phone: siteConfig.phone || '',
            email: siteConfig.email || '',
            reservation_email: siteConfig.reservation_email || '',
            hours: siteConfig.hours || ''
        });
    }, [siteConfig]);

    const MenuManager = () => {
        const [items, setItems] = useState([]);
        const [loading, setLoading] = useState(true);
        const [showAddForm, setShowAddForm] = useState(false);
        const [newItem, setNewItem] = useState({
            name: '', description: '', base_price: 0, category: 'ENTRANTES',
            image_url: '', allergens: [], variants: [], tags: [], is_promoted: false, is_new: false, is_active: true
        });

        useEffect(() => {
            fetchItems();
        }, []);

        const fetchItems = async () => {
            try {
                const res = await axios.get('http://localhost:8000/admin/menu');
                setItems(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching menu", err);
            }
        };

        const handleToggle = async (id, field, value) => {
            try {
                await axios.patch(`http://localhost:8000/admin/menu/${id}/status`, { [field]: value });
                fetchItems();
            } catch (err) {
                alert("Error updating item");
            }
        };

        const handleDelete = async (id) => {
            if (window.confirm("¿Seguro que quieres borrar este plato?")) {
                await axios.delete(`http://localhost:8000/admin/menu/${id}`);
                fetchItems();
            }
        };

        const handleAddSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post('http://localhost:8000/admin/menu', newItem);
                setShowAddForm(false);
                fetchItems();
                setNewItem({
                    name: '', description: '', base_price: 0, category: 'ENTRANTES',
                    image_url: '', allergens: [], variants: [], tags: [],
                    is_promoted: false, is_new: false, is_active: true
                });
            } catch (err) {
                alert("Error creating item");
            }
        };

        if (loading) return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Cargando carta...</p>
            </div>
        );

        return (
            <div className="menu-manager fade-in">
                <div className="manager-header" style={{ marginBottom: '2rem' }}>
                    <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Cerrar Formulario' : <><Plus size={18} /> Añadir Plato</>}
                    </button>
                </div>

                {showAddForm && (
                    <div className="glass-card add-form fade-in" style={{ marginBottom: '3rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Nuevo Plato</h3>
                        <form onSubmit={handleAddSubmit}>
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label>Nombre del Plato</label>
                                    <input type="text" required value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Categoría</label>
                                    <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                                        <option>ENTRANTES</option>
                                        <option>PO BOYS</option>
                                        <option>PATATAS</option>
                                        <option>ENSALADAS</option>
                                        <option>BRIOCHE</option>
                                        <option>POSTRES</option>
                                        <option>SALSAS</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>URL de la Imagen</label>
                                <input type="text" placeholder="/images/plato.jpeg o https://..." value={newItem.image_url} onChange={e => setNewItem({ ...newItem, image_url: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea rows="3" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Precio Base (€)</label>
                                <input type="number" step="0.01" value={newItem.base_price} onChange={e => setNewItem({ ...newItem, base_price: parseFloat(e.target.value) })} />
                            </div>
                            <div className="actions" style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn-primary">Guardar Plato</button>
                                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="items-list">
                    {items.map(item => (
                        <div key={item.id} className="item-row">
                            <div className="item-info-admin">
                                <img
                                    className="mini-preview"
                                    src={item.image_url || '/images/default.jpg'}
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=Gulah'}
                                    alt=""
                                />
                                <div className="info">
                                    <h4 style={{ textTransform: 'uppercase', fontSize: '1rem' }}>
                                        {item.name} <span className="category-pill">{item.category}</span>
                                    </h4>
                                    <p style={{ fontWeight: '500', color: 'var(--primary)', marginTop: '0.3rem' }}>
                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.base_price)}
                                    </p>
                                </div>
                            </div>
                            <div className="status-toggles">
                                <button className={item.is_active ? 'active' : ''} onClick={() => handleToggle(item.id, 'is_active', !item.is_active)}>
                                    {item.is_active ? 'Visible' : 'Oculto'}
                                </button>
                                <button className={item.is_promoted ? 'active' : ''} onClick={() => handleToggle(item.id, 'is_promoted', !item.is_promoted)}>
                                    Oferta
                                </button>
                                <button className={item.is_new ? 'active' : ''} onClick={() => handleToggle(item.id, 'is_new', !item.is_new)}>
                                    Nuevo
                                </button>
                            </div>
                            <button className="btn-secondary" style={{ color: '#ff4444', borderColor: '#ff4444', padding: '0.6rem' }} onClick={() => handleDelete(item.id)}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleSaveHero = async () => {
        await updateConfigByKey('welcomeTitle', heroConfig.welcomeTitle);
        await updateConfigByKey('welcomeSubtitle', heroConfig.welcomeSubtitle);
        alert('Configuración de Home guardada!');
    };

    const handleSaveContact = async () => {
        await updateConfigByKey('contact_info', contactConfig);
        alert('Información de contacto guardada!');
    };

    return (
        <div className="admin-dashboard fade-in">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h3 style={{ color: 'var(--text)', fontSize: '1.2rem' }}>Panel Admin</h3>
                </div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'config' ? 'active' : ''} onClick={() => setActiveTab('config')}>
                        <LayoutDashboard size={20} /> Home Config
                    </button>
                    <button className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>
                        <MapPin size={20} /> Contacto & Horarios
                    </button>
                    <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>
                        <Utensils size={20} /> Carta Digital
                    </button>
                    <button className={activeTab === 'reservations' ? 'active' : ''} onClick={() => setActiveTab('reservations')}>
                        <Calendar size={20} /> Reservas
                    </button>
                </nav>
            </aside>

            <main className="admin-content">
                <header className="content-header">
                    <h2 style={{ fontSize: '2rem' }}>
                        {activeTab === 'config' ? 'Ajustes de Portada' :
                            activeTab === 'contact' ? 'Contacto y Horarios' :
                                activeTab === 'menu' ? 'Gestión de la Carta' : 'Control de Reservas'}
                    </h2>
                    {(activeTab === 'config') && (
                        <button className="btn-primary" onClick={handleSaveHero}>
                            <Save size={18} /> Guardar Portada
                        </button>
                    )}
                    {(activeTab === 'contact') && (
                        <button className="btn-primary" onClick={handleSaveContact}>
                            <Save size={18} /> Guardar Contacto
                        </button>
                    )}
                </header>

                {activeTab === 'config' && (
                    <div className="glass-card config-form fade-in">
                        <div className="form-group">
                            <label>Titular Principal (Home)</label>
                            <input
                                type="text"
                                value={heroConfig.welcomeTitle}
                                onChange={(e) => setHeroConfig({ ...heroConfig, welcomeTitle: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mensaje de Subtítulo</label>
                            <textarea
                                rows="3"
                                value={heroConfig.welcomeSubtitle}
                                onChange={(e) => setHeroConfig({ ...heroConfig, welcomeSubtitle: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div className="glass-card config-form fade-in">
                        <div className="form-group">
                            <label><MapPin size={14} /> Dirección Física</label>
                            <input
                                type="text"
                                value={contactConfig.address}
                                onChange={(e) => setContactConfig({ ...contactConfig, address: e.target.value })}
                            />
                        </div>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="form-group">
                                <label><Phone size={14} /> Teléfono de Contacto</label>
                                <input
                                    type="text"
                                    value={contactConfig.phone}
                                    onChange={(e) => setContactConfig({ ...contactConfig, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label><Mail size={14} /> Email General</label>
                                <input
                                    type="email"
                                    value={contactConfig.email}
                                    onChange={(e) => setContactConfig({ ...contactConfig, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label><Calendar size={14} /> Email para Reservas (interno)</label>
                            <input
                                type="email"
                                value={contactConfig.reservation_email}
                                onChange={(e) => setContactConfig({ ...contactConfig, reservation_email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label><Clock size={14} /> Horario de Apertura</label>
                            <input
                                type="text"
                                placeholder="E.j. Lunes - Domingo: 13:00 - 00:00"
                                value={contactConfig.hours}
                                onChange={(e) => setContactConfig({ ...contactConfig, hours: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'menu' && (
                    <MenuManager />
                )}

                {activeTab === 'reservations' && (
                    <div className="glass-card fade-in" style={{ textAlign: 'center', padding: '5rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Las reservas se gestionan externamente a través de CoverManager.</p>
                        <a href="https://www.covermanager.com" target="_blank" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Ir a CoverManager</a>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
