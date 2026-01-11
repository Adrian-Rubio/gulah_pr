import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Component for rendering an individual menu item card.
 * Handles allergen icons, price variants, and status badges.
 * 
 * @param {Object} props - Component properties.
 * @param {Object} props.item - The menu item data object.
 * @param {Function} props.formatPrice - Helper function to format currency.
 * @param {Object} props.ALLERGEN_ICONS - Mapping of allergen names to icon paths.
 */
const MenuCard = ({ item, formatPrice, ALLERGEN_ICONS }) => {
    // Ensure nested data is correctly formatted
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
        <motion.div
            className="menu-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
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
        </motion.div>
    );
};

export default MenuCard;
