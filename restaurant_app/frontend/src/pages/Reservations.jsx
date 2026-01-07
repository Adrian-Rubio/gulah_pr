import { useState } from 'react';
import { Calendar, Users, Clock, Send } from 'lucide-react';

const Reservations = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        guests: 2,
        date: '',
        time: '20:30'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Reserva solicitada para ${formData.name} el ${formData.date} a las ${formData.time}`);
    };

    return (
        <div className="reservations-page fade-in">
            <div className="page-header">
                <h2>Reservar Mesa</h2>
                <p>Asegura tu lugar en una noche mágica.</p>
            </div>

            <div className="reservation-container">
                <div className="reservation-image">
                    {/* Aquí podría ir una imagen de una mesa montada */}
                    <img src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?auto=format&fit=crop&q=80&w=1000" alt="Mesa reservada" />
                </div>

                <form className="glass-card reservation-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label><Users size={14} /> Comensales</label>
                            <input type="number" min="1" max="20" value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label><Calendar size={14} /> Fecha</label>
                            <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label><Clock size={14} /> Hora</label>
                        <select value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })}>
                            <option>13:00</option>
                            <option>13:30</option>
                            <option>14:00</option>
                            <option>20:30</option>
                            <option>21:00</option>
                            <option>21:30</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary w-full">Confirmar Reserva <Send size={18} /></button>
                </form>
            </div>
        </div>
    );
};

export default Reservations;
