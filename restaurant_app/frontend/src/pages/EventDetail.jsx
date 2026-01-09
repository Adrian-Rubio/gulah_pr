import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const EventDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`);
                setPost(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching event", err);
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Cargando historia...</p>
        </div>
    );

    if (!post) return (
        <div className="error-state" style={{ textAlign: 'center', padding: '5rem' }}>
            <h2>Evento no encontrado</h2>
            <Link to="/events" className="btn-secondary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                <ArrowLeft size={18} /> Volver a Eventos
            </Link>
        </div>
    );

    return (
        <motion.div
            className="event-detail-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="detail-container">
                <Link to="/events" className="back-link">
                    <ArrowLeft size={20} /> Volver al Journal
                </Link>

                <motion.div
                    className="detail-header"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="blog-date">
                        <Calendar size={18} /> {formatDate(post.created_at)}
                    </span>
                    <h1>{post.title}</h1>
                </motion.div>

                <motion.div
                    className="detail-image"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <img src={post.image_url || '/images/default.jpg'} alt={post.title} />
                </motion.div>

                <motion.div
                    className="detail-content"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {post.content.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default EventDetail;
