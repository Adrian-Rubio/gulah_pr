const BLOG_POSTS = [
    {
        id: 1,
        title: 'Noche de Jazz & BBQ',
        date: '15 de Enero, 2026',
        excerpt: 'Ven a disfrutar de una velada única con los mejores músicos de jazz locales mientras degustas nuestras icónicas alitas.',
        image: '/images/Wings.jpeg'
    },
    {
        id: 2,
        title: 'Secretos del Ahumado',
        date: '22 de Enero, 2026',
        excerpt: 'Descubre cómo preparamos nuestro Pulled Pork en una sesión especial con nuestro Pitmaster.',
        image: '/images/pulled pork.jpeg'
    }
];

const Blog = () => {
    return (
        <div className="blog-page fade-in">
            <div className="page-header">
                <h2 className="bold-title">Journal Gulah</h2>
                <p className="subtitle">Eventos, historias y el humo que nos une.</p>
            </div>

            <div className="blog-grid">
                {BLOG_POSTS.map(post => (
                    <article key={post.id} className="blog-card menu-card">
                        <div className="menu-card-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className="menu-card-content">
                            <span className="blog-date">{post.date}</span>
                            <h3 style={{ margin: '1rem 0', fontSize: '1.6rem' }}>{post.title}</h3>
                            <p className="description">{post.excerpt}</p>
                            <button className="btn-secondary" style={{ alignSelf: 'flex-start' }}>Leer más</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
