import { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import MarqueeBanner from '../components/MarqueeBanner';

const Home = () => {
    const { siteConfig } = useConfig();
    const [activeFaq, setActiveFaq] = useState(null);

    const faqs = [
        {
            question: "¿Cómo hago una reserva?",
            answer: "Si sois un buen grupo llámanos y te guardamos sitio. Si vienes solo o en pareja, vente directo y buscamos hueco."
        },
        {
            question: "Política de cancelación",
            answer: "Si reservaste y al final no puedes venir, avísanos con tiempo. No nos gusta ver mesas vacías cuando alguien más pudo haber disfrutado. Sé buena gente y llámanos."
        },
        {
            question: "Alergias e intolerancias",
            answer: "Lo primero, avísanos cuando pidas. Lo segundo, confía en que aquí nos tomamos en serio lo que va en el plato. Si hay algo que no puedes comer, lo adaptamos o te recomendamos lo mejor para ti."
        },
        {
            question: "¿Se puede venir con niños?",
            answer: "Claro, pero recuerda que aquí el ruido lo pone la música y no los gritos. Si vienen peques, bienvenidos… pero que traigan buen saque, que aquí se come en serio."
        },
        {
            question: "Código de vestimenta",
            answer: "La única regla es venir con hambre. Si eso, ponte algo cómodo para disfrutar bien la comida. Pero si te vienes elegante, tampoco te vamos a juzgar."
        }
    ];

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="home-page fade-in">
            <MarqueeBanner />

            <section className="hero">
                <div className="hero-content">
                    <h2 className="fade-in">
                        {(() => {
                            const words = (siteConfig.welcomeTitle || "").split(' ');
                            if (words.length > 1) {
                                return (
                                    <>
                                        <span>{words[0]}</span> {words.slice(1).join(' ')}
                                    </>
                                );
                            }
                            return siteConfig.welcomeTitle;
                        })()}
                    </h2>
                    <p className="fade-in-delay">{siteConfig.welcomeSubtitle}</p>
                    <div className="hero-actions fade-in-delay-2">
                        <Link to="/menu" className="btn-primary">Ver la Carta <ArrowRight size={18} /></Link>
                        <Link to="/reservations" className="btn-secondary">Reservar Mesa</Link>
                    </div>
                </div>
                <div className="hero-image-container fade-in-delay">
                    <img src="/images/home-hero-new.jpg" alt="Plato estrella Gulah" className="hero-image" />
                </div>
            </section>

            <section className="faq-section fade-in">
                <div className="faq-grid">
                    <div className="faq-header">
                        <h2>FAQ'S</h2>
                        <p>Sabemos que tienes dudas, y como no nos gusta dejarte en visto, aquí van las respuestas. Léelas, asimílalas y si todavía te queda alguna, pregúntanos sin miedo.</p>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                                <button className="faq-question" onClick={() => toggleFaq(index)}>
                                    {faq.question}
                                    <Plus className="faq-icon" size={24} />
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
