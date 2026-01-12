import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import EditableText from '../components/Editable/EditableText';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '../components/MenuCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.221:8000';

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

/**
 * Menu Page Component
 * Fetches and displays menu items categorized by tabs.
 * Supports dynamic categories from the database.
 */
const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('ENTRANTES');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Calculates unique categories from items, sorted by preferred order.
     */
    const categories = useMemo(() => {
        if (!Array.isArray(items) || !items.length) return [];
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

    /**
     * Fetch menu items on mount.
     */
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`${API_URL}/menu`);
                setItems(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching menu", err);
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    /**
     * Ensures an active category is always selected when items load.
     */
    useEffect(() => {
        if (categories.length > 0 && !categories.includes(activeCategory)) {
            setActiveCategory(categories[0]);
        }
    }, [categories, activeCategory]);

    /**
     * Formats prices to EUR currency format.
     */
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

    return (
        <div className="menu-page">
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {Array.isArray(items) && items
                        .filter(item => (item.category || "VARIOS").trim().toUpperCase() === activeCategory.toUpperCase())
                        .map(item => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                formatPrice={formatPrice}
                                ALLERGEN_ICONS={ALLERGEN_ICONS}
                            />
                        ))}
                </motion.div>
            </AnimatePresence>

            {items.filter(item => (item.category || "VARIOS").trim().toUpperCase() === activeCategory.toUpperCase()).length === 0 && !loading && (
                <div className="empty-state">
                    <EditableText configKey="menuEmptyState" tag="p" />
                </div>
            )}
        </div>
    );
};

export default Menu;
