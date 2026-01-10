import { useState, useEffect } from 'react';
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

const Menu = () => {
    const categories = ['ENTRANTES', 'PO BOYS', 'PATATAS', 'ENSALADAS', 'BRIOCHE', 'POSTRES', 'SALSAS'];
    const [activeCategory, setActiveCategory] = useState('ENTRANTES');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

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

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    className="menu-grid"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {items.filter(item => (item.category || "").trim().toUpperCase() === activeCategory.toUpperCase()).map(item => {
                        const safeAllergens = Array.isArray(item.allergens) ? item.allergens : (typeof item.allergens === 'string' ? JSON.parse(item.allergens || '[]') : []);
                        const safeVariants = Array.isArray(item.variants) ? item.variants : (typeof item.variants === 'string' ? JSON.parse(item.variants || '[]') : []);

                        return (
                            <motion.div
                                key={item.id}
                                className="menu-card"
                                variants={itemVariants}
                            >
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

                                    <p className="description">{item.description}</p>

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
                            </motion.div>
                        );
                    })}
                    {items.filter(item => (item.category || "").trim().toUpperCase() === activeCategory.toUpperCase()).length === 0 && (
                        <div className="empty-state">
                            <EditableText configKey="menuEmptyState" tag="p" />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default Menu;

