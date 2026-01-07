import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import axios from 'axios';

const ALLERGEN_ICONS = {
    "Gluten": "/icons/simbolo-alergeno-cereales.png",
    "Lácteos": "/icons/simbolo-alergeno-lacteos.png",
    "Huevos": "/icons/simbolo-alergeno-huevos.png",
    "Soja": "/icons/simbolo-alergeno-soja.png",
    "Mostaza": "/icons/simbolo-alergeno-mostaza.png",
    "Pescado": "/icons/simbolo-pescado-alergenos.png",
    "Crustáceos": "/icons/simbolo-alergeno-crustaceo.png",
    "Moluscos": "/icons/simbolo-alergeno-moluscos.png",
    "Apio": "/icons/simbolo-alergeno-apio.png",
    "Frutos de Cáscara": "/icons/simbolo-alergeno-frutos-secos.png",
    "Dióxido de Azufre y Sulfitos": "/icons/simbolo-alergeno-sulfitos.png",
    "Altramuces": "/icons/simbolo-alergeno-altramuz.png",
    "Sésamo": "/icons/simbolo-alergeno-sesamopng.png",
    "Cacahuetes": "/icons/simbolo-alergeno-cacahuetes.png"
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
                            {item.image_url ? (
                                <img src={item.image_url} alt={item.name} />
                            ) : (
                                <div className="no-image-placeholder">
                                    <Flame size={40} />
                                    <p>Imagen no disponible por el momento</p>
                                </div>
                            )}
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
                                        <img
                                            key={a}
                                            src={ALLERGEN_ICONS[a] || "/icons/default.png"}
                                            alt={a}
                                            title={a}
                                            className="allergen-icon-img"
                                        />
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
