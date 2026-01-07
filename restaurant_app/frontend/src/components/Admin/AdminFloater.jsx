import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Edit, Save, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminFloater = () => {
    const { isEditMode, toggleEditMode } = useConfig();

    // In a real app, check for auth token here
    const isAdmin = localStorage.getItem('token');

    if (!isAdmin) return null;

    return (
        <div className="admin-floater">
            <button
                className={`floater-btn ${isEditMode ? 'active' : ''}`}
                onClick={toggleEditMode}
                title={isEditMode ? "Desactivar Edición" : "Activar Edición"}
            >
                {isEditMode ? <Save size={20} /> : <Edit size={20} />}
                <span>{isEditMode ? "Salir de Edición" : "Modo Edición"}</span>
            </button>
            <Link to="/admin" className="floater-btn secondary" title="Panel de Control">
                <LayoutDashboard size={20} />
            </Link>
        </div>
    );
};

export default AdminFloater;
