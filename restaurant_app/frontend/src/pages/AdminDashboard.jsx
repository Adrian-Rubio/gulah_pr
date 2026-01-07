import { useState, useEffect } from 'react';
import { LayoutDashboard, Utensils, Calendar, Settings, Save } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import axios from 'axios'; // Added axios import

const AdminDashboard = () => {
    const { siteConfig, setSiteConfig } = useConfig();
    const [activeTab, setActiveTab] = useState('config');
    const [siteParams, setSiteParams] = useState(siteConfig);

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

        if (loading) return <p>Cargando carta...</p>;

        return (
            <div className="menu-manager">
                <div className="manager-header">
                    <button className="btn-primary" onClick={() => setShowAddForm(true)}>+ Añadir Plato</button>
                </div>

                {showAddForm && (
                    <div className="glass-card add-form fade-in">
                        <h3>Nuevo Plato</h3>
                        <form onSubmit={handleAddSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type="text" required value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Categoría</label>
                                    <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                                        <option>ENTRANTES</option>
                                        <option>PO BOYS</option>
                                        <option>PATATAS</option>
                                        <option>ENSALADAS</option>
                                        <option>POSTRES</option>
                                        <option>SALSAS</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Imagen URL</label>
                                <input type="text" placeholder="https://..." value={newItem.image_url} onChange={e => setNewItem({ ...newItem, image_url: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Precio Base (€)</label>
                                <input type="number" step="0.01" value={newItem.base_price} onChange={e => setNewItem({ ...newItem, base_price: parseFloat(e.target.value) })} />
                            </div>
                            <div className="actions">
                                <button type="submit" className="btn-primary">Guardar</button>
                                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="items-list">
                    {items.map(item => (
                        <div key={item.id} className="item-row glass-card">
                            <div className="item-info-admin">
                                {item.image_url && <img className="mini-preview" src={item.image_url} alt="" />}
                                <div className="info">
                                    <h4>{item.name} <span className="category-pill">{item.category}</span></h4>
                                    <p>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.base_price)}</p>
                                </div>
                            </div>
                            <div className="status-toggles">
                                <button className={item.is_active ? 'active' : ''} onClick={() => handleToggle(item.id, 'is_active', !item.is_active)}>
                                    {item.is_active ? 'Visible' : 'Oculto'}
                                </button>
                                <button className={item.is_promoted ? 'active' : ''} onClick={() => handleToggle(item.id, 'is_promoted', !item.is_promoted)}>
                                    Promoción
                                </button>
                                <button className={item.is_new ? 'active' : ''} onClick={() => handleToggle(item.id, 'is_new', !item.is_new)}>
                                    Novedad
                                </button>
                            </div>
                            <button className="btn-delete" onClick={() => handleDelete(item.id)}>Borrar</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

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
                    <MenuManager />
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
