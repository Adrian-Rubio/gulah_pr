import { useState, useEffect } from 'react';
import { LayoutDashboard, Utensils, Calendar, Settings, Save, Trash2, Plus, MapPin, Phone, Mail, Clock, Users, Eye, EyeOff } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const AdminDashboard = () => {
    const { siteConfig, updateConfigByKey, fetchConfig, isEditMode, toggleEditMode } = useConfig();
    const [activeTab, setActiveTab] = useState('config');
    const navigate = useNavigate();
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    const currentUser = JSON.parse(userString || '{}');

    useEffect(() => {
        if (!userString) {
            navigate('/admin');
        }
    }, [userString, navigate]);

    // ... (rest of the state logic)

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
                const res = await axios.get(`${API_URL}/admin/menu`);
                setItems(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching menu", err);
            }
        };

        const handleToggle = async (id, field, value) => {
            try {
                await axios.patch(`${API_URL}/admin/menu/${id}/status`, { [field]: value });
                fetchItems();
            } catch (err) {
                alert("Error updating item");
            }
        };

        const handleDelete = async (id) => {
            if (window.confirm("¿Seguro que quieres borrar este plato?")) {
                await axios.delete(`${API_URL}/admin/menu/${id}`);
                fetchItems();
            }
        };

        const handleAddSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post(`${API_URL}/admin/menu`, newItem);
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

    const EventsManager = () => {
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [showAddForm, setShowAddForm] = useState(false);
        const [newPost, setNewPost] = useState({ title: '', content: '', image_url: '' });

        useEffect(() => {
            fetchPosts();
        }, []);

        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${API_URL}/blog`);
                setPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog", err);
            }
        };

        const handleDelete = async (id) => {
            if (window.confirm("¿Borrar este evento?")) {
                await axios.delete(`${API_URL}/admin/blog/${id}`);
                fetchPosts();
            }
        };

        const handleAddSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post(`${API_URL}/admin/blog`, newPost);
                setShowAddForm(false);
                fetchPosts();
                setNewPost({ title: '', content: '', image_url: '' });
            } catch (err) {
                alert("Error al crear el post");
            }
        };

        const handleImageUpload = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await axios.post(`${API_URL}/admin/upload`, formData);
                let url = res.data.url;
                if (url.startsWith('/')) url = `${API_URL}${url}`;
                setNewPost({ ...newPost, image_url: url });
            } catch (err) {
                alert("Error subiendo imagen");
            }
        };

        if (loading) return <div>Cargando...</div>;

        return (
            <div className="events-manager fade-in">
                <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)} style={{ marginBottom: '2rem' }}>
                    {showAddForm ? 'Cancelar' : 'Nuevo Evento'}
                </button>

                {showAddForm && (
                    <div className="glass-card fade-in" style={{ marginBottom: '2rem' }}>
                        <form onSubmit={handleAddSubmit}>
                            <div className="form-group">
                                <label>Título</label>
                                <input type="text" required value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Imagen</label>
                                <input type="file" onChange={handleImageUpload} />
                                {newPost.image_url && <img src={newPost.image_url} style={{ height: '100px', marginTop: '10px', borderRadius: '8px' }} />}
                            </div>
                            <div className="form-group">
                                <label>Contenido / Descripción</label>
                                <textarea required rows="4" value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} />
                            </div>
                            <button type="submit" className="btn-primary">Publicar Evento</button>
                        </form>
                    </div>
                )}

                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className="item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #eee' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <img src={post.image_url || '/images/default.jpg'} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', marginBottom: '0.3rem' }}>{post.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>{new Date(post.created_at).toLocaleDateString()}</p>
                                    <p style={{ fontSize: '0.9rem', color: '#333', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.content}</p>
                                </div>
                            </div>
                            <button className="btn-secondary" style={{ color: '#ff4444', borderColor: '#ff4444', padding: '0.8rem' }} onClick={() => handleDelete(post.id)}>
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    const UsersManager = () => {
        const [users, setUsers] = useState([]);
        const [showAdd, setShowAdd] = useState(false);
        const [editingUser, setEditingUser] = useState(null);
        const [newUser, setNewUser] = useState({ username: '', password: '', is_superuser: false });
        const [showPassCreate, setShowPassCreate] = useState(false);
        const [showPassEdit, setShowPassEdit] = useState(false);

        useEffect(() => {
            fetchUsers();
        }, []);

        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}/admin/users`);
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users", err);
            }
        };

        const handleCreate = async (e) => {
            e.preventDefault();
            try {
                await axios.post(`${API_URL}/admin/users`, newUser);
                setShowAdd(false);
                fetchUsers();
                setNewUser({ username: '', password: '', is_superuser: false });
            } catch (err) {
                alert(err.response?.data?.detail || "Error al crear usuario");
            }
        };

        const handleUpdate = async (e) => {
            e.preventDefault();
            try {
                // We send the whole object, backend handles password if not empty
                await axios.put(`${API_URL}/admin/users/${editingUser.id}`, editingUser);
                setEditingUser(null);
                fetchUsers();
            } catch (err) {
                alert(err.response?.data?.detail || "Error al actualizar usuario");
            }
        };

        const handleDelete = async (id) => {
            if (window.confirm("¿Borrar este usuario?")) {
                await axios.delete(`${API_URL}/admin/users/${id}`);
                fetchUsers();
            }
        };

        return (
            <div className="users-manager fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <button className="btn-primary" onClick={() => { setShowAdd(!showAdd); setEditingUser(null); }}>
                        {showAdd ? 'Cancelar' : 'Crear Nuevo Usuario'}
                    </button>
                    <p style={{ fontSize: '0.8rem', color: '#666', background: '#f0f0f0', padding: '5px 12px', borderRadius: '4px' }}>
                        🔒 Las contraseñas se almacenan encriptadas y no son legibles.
                    </p>
                </div>

                {showAdd && (
                    <div className="glass-card fade-in" style={{ marginBottom: '2rem' }}>
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Nombre de Usuario</label>
                                <input type="text" required value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassCreate ? "text" : "password"}
                                        required
                                        value={newUser.password}
                                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassCreate(!showPassCreate)}
                                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
                                    >
                                        {showPassCreate ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input type="checkbox" checked={newUser.is_superuser} onChange={e => setNewUser({ ...newUser, is_superuser: e.target.checked })} />
                                <label style={{ margin: 0 }}>¿Es Super Usuario? (Permite gestionar otros usuarios)</label>
                            </div>
                            <button type="submit" className="btn-primary">Crear Usuario</button>
                        </form>
                    </div>
                )}

                <div className="users-list">
                    {users.map(u => (
                        <div key={u.id} className="item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', border: (editingUser && editingUser.id === u.id) ? '2px solid var(--primary)' : (u.is_superuser ? '2px solid #333' : '1px solid #eee') }}>
                            {editingUser && editingUser.id === u.id ? (
                                <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '15px', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1, minWidth: '150px' }}>
                                        <input type="text" value={editingUser.username} onChange={e => setEditingUser({ ...editingUser, username: e.target.value })} style={{ width: '100%', marginBottom: 0 }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: '180px', position: 'relative' }}>
                                        <input
                                            type={showPassEdit ? "text" : "password"}
                                            placeholder="Nueva clave (opcional)"
                                            onChange={e => setEditingUser({ ...editingUser, password: e.target.value })}
                                            style={{ width: '100%', marginBottom: 0, paddingRight: '35px' }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassEdit(!showPassEdit)}
                                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
                                        >
                                            {showPassEdit ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input type="checkbox" checked={editingUser.is_superuser} onChange={e => setEditingUser({ ...editingUser, is_superuser: e.target.checked })} id={`super-${u.id}`} />
                                        <label htmlFor={`super-${u.id}`} style={{ fontSize: '0.8rem', margin: 0, cursor: 'pointer' }}>Super</label>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}><Save size={18} /></button>
                                        <button type="button" className="btn-secondary" onClick={() => { setEditingUser(null); setShowPassEdit(false); }} style={{ padding: '0.5rem 1rem' }}>X</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase' }}>{u.username}</h4>
                                        <p style={{ fontSize: '0.8rem', color: u.is_superuser ? 'var(--primary)' : '#666', fontWeight: u.is_superuser ? 'bold' : 'normal' }}>
                                            {u.is_superuser ? 'SUPER USUARIO' : 'ADMINISTRADOR'}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn-secondary" title="Editar" onClick={() => { setEditingUser({ ...u, password: '' }); setShowAdd(false); setShowPassEdit(false); }}>
                                            <Settings size={18} />
                                        </button>
                                        {u.username !== currentUser.username && (
                                            <button className="btn-secondary" title="Eliminar" style={{ color: '#ff4444', borderColor: '#ff4444' }} onClick={() => handleDelete(u.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
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

    const handleLaunchEditor = () => {
        if (!isEditMode) toggleEditMode();
        navigate('/');
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
                    <button className={activeTab === 'editor' ? 'active' : ''} onClick={() => setActiveTab('editor')}>
                        <Plus size={20} /> Editor Visual
                    </button>
                    <button className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>
                        <MapPin size={20} /> Contacto & Horarios
                    </button>
                    <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>
                        <Utensils size={20} /> Carta Digital
                    </button>
                    <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>
                        <Calendar size={20} /> Gestión de Eventos
                    </button>
                    <button className={activeTab === 'reservations' ? 'active' : ''} onClick={() => setActiveTab('reservations')}>
                        <Clock size={20} /> Reservas
                    </button>
                    {currentUser.is_superuser && (
                        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                            <Users size={20} /> Usuarios
                        </button>
                    )}
                </nav>
            </aside>

            <main className="admin-content">
                <header className="content-header">
                    <h2 style={{ fontSize: '2rem' }}>
                        {activeTab === 'config' ? 'Ajustes de Portada' :
                            activeTab === 'editor' ? 'Editor Visual' :
                                activeTab === 'contact' ? 'Contacto y Horarios' :
                                    activeTab === 'menu' ? 'Gestión de la Carta' :
                                        activeTab === 'events' ? 'Eventos y Journal' :
                                            activeTab === 'users' ? 'Gestión de Usuarios' : 'Control de Reservas'}
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

                {activeTab === 'editor' && (
                    <div className="glass-card fade-in" style={{ padding: '4rem', textAlign: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <Settings size={64} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Editor Visual "En Vivo"</h3>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
                                Esta funcionalidad te permite editar los textos y las imágenes directamente sobre la web, viendo los cambios en tiempo real antes de guardarlos.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <button className="btn-primary" style={{ padding: '1.2rem 2.5rem' }} onClick={handleLaunchEditor}>
                                <Plus size={20} /> Activar Edición e ir al Inicio
                            </button>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                * Al pulsar, serás redirigido a la página de inicio con los controles de edición activos.
                            </p>
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

                {activeTab === 'events' && (
                    <EventsManager />
                )}

                {activeTab === 'reservations' && (
                    <div className="glass-card fade-in" style={{ textAlign: 'center', padding: '5rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Las reservas se gestionan externamente a través de CoverManager.</p>
                        <a href="https://www.covermanager.com" target="_blank" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Ir a CoverManager</a>
                    </div>
                )}

                {activeTab === 'users' && currentUser.is_superuser && (
                    <UsersManager />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
