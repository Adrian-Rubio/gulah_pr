const BLOG_POSTS = [
    {
        id: 1,
        title: 'Noche de Jazz en Vivo',
        date: '15 de Enero, 2026',
        excerpt: 'Ven a disfrutar de una velada única con los mejores músicos de jazz locales mientras degustas nuestra nueva carta.',
        image: 'https://images.unsplash.com/photo-1514525253344-99a429993292?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'Cata de Vinos de la Ribera',
        date: '22 de Enero, 2026',
        excerpt: 'Descubre los secretos de los mejores caldos de nuestra bodega en una cata guiada por nuestro sumiller.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800'
    }
];

const Blog = () => {
    return (
        <div className="blog-page fade-in">
            <div className="page-header">
                <h2>Eventos y Novedades</h2>
                <p>Mantente al día con lo que sucede en Golden Fork.</p>
            </div>

            <div className="blog-grid">
                {BLOG_POSTS.map(post => (
                    <article key={post.id} className="blog-card glass-card">
                        <div className="blog-image">
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className="blog-content">
                            <span className="blog-date">{post.date}</span>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <button className="btn-secondary">Leer más</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
