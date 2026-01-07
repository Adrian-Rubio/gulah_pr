import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditableText from '../components/Editable/EditableText';
import { Calendar } from 'lucide-react';

const Events = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/blog');
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

    return (
        <div className="blog-page fade-in">
            <div className="page-header">
                <EditableText configKey="eventsTitle" tag="h2" className="bold-title" />
                <EditableText configKey="eventsSubtitle" tag="p" className="subtitle" />
            </div>

            <div className="blog-grid">
                {posts.map(post => (
                    <article key={post.id} className="blog-card menu-card">
                        <div className="menu-card-image">
                            <img src={post.image_url || '/images/default.jpg'} alt={post.title} />
                        </div>
                        <div className="menu-card-content">
                            <span className="blog-date" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
                                <Calendar size={14} /> {formatDate(post.created_at)}
                            </span>
                            <h3 style={{ margin: '1rem 0', fontSize: '1.6rem', textTransform: 'uppercase' }}>{post.title}</h3>
                            <p className="description">{post.content}</p>
                            <button className="btn-secondary" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>Leer más</button>
                        </div>
                    </article>
                ))}
            </div>

            {posts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
                    <p>No hay eventos programados en este momento. ¡Vuelve pronto!</p>
                </div>
            )}
        </div>
    );
};

export default Events;
