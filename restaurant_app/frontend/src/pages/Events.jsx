import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import EditableText from '../components/Editable/EditableText';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Events = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${API_URL}/blog`);
                setPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching events", err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const formatDate = (dateString) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        } catch (e) {
            return dateString;
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Cargando eventos...</p>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="blog-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="page-header">
                <EditableText configKey="eventsTitle" tag="h2" className="bold-title" />
                <EditableText configKey="eventsSubtitle" tag="p" className="subtitle" />
            </div>

            <div className="blog-grid">
                {posts.map(post => (
                    <motion.article
                        key={post.id}
                        className="blog-card menu-card"
                        variants={cardVariants}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                        <div className="menu-card-image">
                            <img src={post.image_url || '/images/default.jpg'} alt={post.title} />
                        </div>
                        <div className="menu-card-content">
                            <span className="blog-date" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
                                <Calendar size={14} /> {formatDate(post.created_at)}
                            </span>
                            <h3 style={{ margin: '1rem 0', fontSize: '1.6rem', textTransform: 'uppercase' }}>{post.title}</h3>
                            <p className="description" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {post.content}
                            </p>
                            <Link
                                to={`/events/${post.id}`}
                                className="btn-secondary"
                                style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                            >
                                Leer más
                            </Link>
                        </div>
                    </motion.article>
                ))}
            </div>

            {posts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
                    <p>No hay eventos programados en este momento. ¡Vuelve pronto!</p>
                </div>
            )}
        </motion.div>
    );
};

export default Events;

