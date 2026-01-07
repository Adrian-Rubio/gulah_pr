import { useState, useEffect } from 'react';
import axios from 'axios';

const ALLERGEN_ICONS = {
    "Gluten": "🌾",
    "Lácteos": "🥛",
    "Huevos": "🥚",
    "Soja": "🫘",
    "Mostaza": "🌭",
    "Pescado": "🐟",
    "Crustáceos": "🦀",
    "Moluscos": "🐚",
    "Apio": "🌱",
    "Frutos de Cáscara": "🥜",
    "Dióxido de Azufre y Sulfitos": "🍇"
};

const Menu = () => {
    const categories = ['ENTRANTES', 'PO BOYS', 'PATATAS', 'ENSALADAS', 'BRIOCHE', 'POSTRES', 'SALSAS'];
    const [activeCategory, setActiveCategory] = useState('ENTRANTES');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:8000/menu');
                setItems(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching menu", err);
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Cargando sabores...</p>
        </div>
    );

    return (
        <div className="menu-page fade-in">
            <div className="page-header">
                <h1 className="bold-title">NUESTRA CARTA</h1>
                <p className="subtitle">Explosión de sabores sin filtros. Sin excusas.</p>
            </div>

            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={activeCategory === cat ? 'active' : ''}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="menu-grid">
                {items.filter(item => item.category === activeCategory).map(item => (
                    <div key={item.id} className="menu-card">
                        <div className="menu-card-image">
                            <img src={item.image_url || 'https://via.placeholder.com/300x300?text=Gulah'} alt={item.name} />
                            {(item.is_new || item.is_promoted) && (
                                <div className="badge-container">
                                    {item.is_new && <span className="badge badge-new">Novedad</span>}
                                    {item.is_promoted && <span className="badge badge-promo">Oferta</span>}
                                </div>
                            )}
                        </div>

                        <div className="menu-card-content">
                            <div className="header-row">
                                <h3>{item.name}</h3>
                                <div className="allergens">
                                    {(item.allergens || []).map(a => (
                                        <span key={a} title={a} className="allergen-icon">
                                            {ALLERGEN_ICONS[a] || "⚠️"}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="description">{item.description}</p>

                            <div className="footer-row">
                                <span className="price">
                                    {item.variants && item.variants.length > 0
                                        ? `${formatPrice(item.variants[0].price)} / ${formatPrice(item.variants[1].price)}`
                                        : formatPrice(item.base_price)
                                    }
                                </span>
                                <button className="btn-add-mini">+</button>
                            </div>
                        </div>
                    </div>
                ))}
                {items.filter(item => item.category === activeCategory).length === 0 && (
                    <div className="empty-state">
                        <p>Próximamente... estamos cocinando algo grande.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
