import { useState } from 'react';

const MENU_DATA = [
    { id: 1, name: 'Tartar de Atún Rojo', price: 18, description: 'Atún rojo de almadraba con aguacate y aliño de soja.', category: 'Entrantes' },
    { id: 2, name: 'Solomillo de Ternera', price: 26, description: 'Solomillo a la brasa con puré de patata trufado.', category: 'Principales' },
    { id: 3, name: 'Tarta de Queso Fluida', price: 9, description: 'Tarta de queso casera con base de galleta artesana.', category: 'Postres' },
];

const Menu = () => {
    const categories = ['Entrantes', 'Principales', 'Postres', 'Vinos'];
    const [activeCategory, setActiveCategory] = useState('Entrantes');

    return (
        <div className="menu-page fade-in">
            <div className="page-header">
                <h2>Nuestra Carta</h2>
                <p>Una selección de los mejores ingredientes para paladares exigentes.</p>
            </div>

            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={activeCategory === cat ? 'active' : ''}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="menu-grid">
                {MENU_DATA.filter(item => item.category === activeCategory).map(item => (
                    <div key={item.id} className="menu-item-card glass-card">
                        <div className="menu-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                        <div className="menu-item-price">
                            {item.price}€
                        </div>
                    </div>
                ))}
                {MENU_DATA.filter(item => item.category === activeCategory).length === 0 && (
                    <p className="empty-msg">Próximamente...</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
