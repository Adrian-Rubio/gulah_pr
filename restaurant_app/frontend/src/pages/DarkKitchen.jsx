import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShoppingBag, Bike, ExternalLink } from 'lucide-react';
import axios from 'axios';
import './DarkKitchen.css'; // We'll create this file next

const DarkKitchen = () => {
    const [floatingItems, setFloatingItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
                // Get 4 random items with images for the floating effect
                const itemsWithImages = res.data.filter(item => item.image_url);
                const shuffled = itemsWithImages.sort(() => 0.5 - Math.random());
                setFloatingItems(shuffled.slice(0, 4));
            } catch (err) {
                console.error("Error fetching floating items", err);
            }
        };
        fetchItems();
    }, []);

    const deliveryPlatforms = [
        {
            name: 'Uber Eats',
            url: 'https://www.ubereats.com/es/store/gulah-po-boys-madrid/Be4npbWTWfSgM5mEkQ2C_w?diningMode=DELIVERY&ps=1&sc=SEARCH_SUGGESTION',
            color: '#06C167',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Uber_Eats_2018_logo.svg' // Placeholder or just icon
        },
        {
            name: 'Glovo',
            url: 'https://glovoapp.com/es/es/madrid/stores/gulah-poboys-madrid',
            color: '#FFC244',
            logo: 'https://upload.wikimedia.org/wikipedia/en/8/82/Glovo_logo.svg'
        },
        {
            name: 'Just Eat',
            url: 'https://www.just-eat.es/restaurants-gulah-po-boys-madrid/menu',
            color: '#FB5000',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Just_Eat_Takeaway.com_logo.svg'
        }
    ];

    return (
        <div className="dark-kitchen-page">
            {/* Floating Background Elements */}
            <div className="floating-elements">
                {floatingItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={`floating-item item-${index}`}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <img src={item.image_url} alt="" />
                    </motion.div>
                ))}
            </div>

            <div className="dk-container">
                <motion.div
                    className="dk-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="dk-tag">EXCLUSIVO DELIVERY</span>
                    <h1>Gulah <span className="text-gradient">Dark Kitchen</span></h1>
                    <p className="dk-description">
                        Nuestra cocina exclusiva para envío a domicilio en el barrio de <strong>Tetuán</strong>.
                        Toda la esencia de New Orleans, preparada al momento y entregada en la puerta de tu casa
                        con la máxima rapidez y calidad.
                    </p>

                    <div className="dk-address-card">
                        <MapPin size={24} className="icon" />
                        <div>
                            <h3>Nuestra Ubicación</h3>
                            <p>Calle de José Calvo 10, 28039 Madrid</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="platforms-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {deliveryPlatforms.map((platform, index) => (
                        <motion.a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="platform-card"
                            whileHover={{ y: -10, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <div className="platform-icon-wrapper" style={{ backgroundColor: platform.color }}>
                                {index === 0 ? <ShoppingBag color="white" size={32} /> :
                                    index === 1 ? <Bike color="white" size={32} /> :
                                        <ShoppingBag color="white" size={32} />}
                            </div>
                            <h3>{platform.name}</h3>
                            <p>Pide tus Po Boys favoritos ahora</p>
                            <span className="order-now">
                                Ir a la plataforma <ExternalLink size={16} />
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default DarkKitchen;
