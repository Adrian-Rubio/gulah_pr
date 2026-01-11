import { useState, useEffect, useMemo } from 'react';
import { Flame } from 'lucide-react';
import axios from 'axios';
import EditableText from '../components/Editable/EditableText';
import { motion, AnimatePresence } from 'framer-motion';

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

const PREFERRED_ORDER = ['ENTRANTES', 'PO BOYS', 'PATATAS', 'ENSALADAS', 'BRIOCHE', 'POSTRES', 'SALSAS'];

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('ENTRANTES');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = useMemo(() => {
        if (!items.length) return [];
        const uniqueCats = [...new Set(items.map(item => (item.category || "VARIOS").trim().toUpperCase()))];
        return uniqueCats.sort((a, b) => {
            const indexA = PREFERRED_ORDER.indexOf(a);
            const indexB = PREFERRED_ORDER.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });
    }, [items]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
                setItems(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching menu", err);
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            // Si la categoría activa no existe en las categorías actuales, 
            // o si todavía es el valor por defecto 'ENTRANTES' y 'ENTRANTES' no está en la lista (pero otras sí),
            // cambiamos a la primera disponible.
            if (!categories.includes(activeCategory)) {
                setActiveCategory(categories[0]);
            }
        }
    }, [categories, activeCategory]);

    const formatPrice = (price) => {
        if (price === undefined || price === null || isNaN(price)) return '0,00 €';
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Cargando sabores...</p>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            className="menu-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="page-header">
                <EditableText configKey="menuTitle" tag="h1" className="bold-title" />
                <EditableText configKey="menuSubtitle" tag="p" className="subtitle" />
            </div>

            <div className="category-tabs">
                {categories.map(cat => (
                    <motion.button
                        key={cat}
                        className={activeCategory === cat ? 'active' : ''}
                        onClick={() => setActiveCategory(cat)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            {/* Diagnóstico sencillo (puedes borrar esto cuando funcione) */}
            <div style={{ fontSize: '10px', opacity: 0.5, textAlign: 'center', marginBottom: '10px' }}>
                Total: {items.length} | Cat: {activeCategory} | Items aquí: {items.filter(item => (item.category || "VARIOS").trim().toUpperCase() === activeCategory.toUpperCase()).length}
            </div>

            <div className="menu-grid">
                {items
                    .filter(item => (item.category || "VARIOS").trim().toUpperCase() === activeCategory.toUpperCase())
                    .map(item => {
                        try {
                            const safeAllergens = Array.isArray(item.allergens)
                                ? item.allergens
                                : (typeof item.allergens === 'string'
                                    ? JSON.parse(item.allergens || '[]')
                                    : []);

                            const safeVariants = Array.isArray(item.variants)
                                ? item.variants
                                : (typeof item.variants === 'string'
                                    ? JSON.parse(item.variants || '[]')
                                    : []);

                            return (
                                <div key={item.id} className="menu-card">
                                    <div className="menu-card-image">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} />
                                        ) : (
                                            <div className="no-image-placeholder">
                                                <Flame size={40} />
                                                <p>Imagen no disponible</p>
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
                                            <h3>{item.name || 'Sin nombre'}</h3>
                                            <div className="allergens">
                                                {(safeAllergens || []).map((a, idx) => (
                                                    <img
                                                        key={`${item.id}-alg-${idx}`}
                                                        src={ALLERGEN_ICONS[a] || "/icons/default.png"}
                                                        alt={a}
                                                        title={a}
                                                        className="allergen-icon-img"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="description">{item.description || 'Sin descripción'}</p>

                                        <div className="footer-row">
                                            <span className="price">
                                                {safeVariants && safeVariants.length >= 2
                                                    ? `${formatPrice(safeVariants[0]?.price)} / ${formatPrice(safeVariants[1]?.price)}`
                                                    : safeVariants && safeVariants.length === 1
                                                        ? formatPrice(safeVariants[0]?.price)
                                                        : formatPrice(item.base_price)
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        } catch (e) {
                            console.error("Error renderizando item", item, e);
                            return null;
                        }
                    })}
            </div>

            {items.filter(item => (item.category || "VARIOS").trim().toUpperCase() === activeCategory.toUpperCase()).length === 0 && (
                <div className="empty-state">
                    <EditableText configKey="menuEmptyState" tag="p" />
                </div>
            )}
        </motion.div>
    );
};

export default Menu;

