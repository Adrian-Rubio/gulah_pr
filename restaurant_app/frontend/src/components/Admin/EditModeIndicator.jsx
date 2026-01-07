import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Save } from 'lucide-react';

const EditModeIndicator = () => {
    const { isEditMode, toggleEditMode } = useConfig();

    if (!isEditMode) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: '#2ecc71',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 10000,
            cursor: 'pointer',
            fontWeight: '900'
        }} onClick={toggleEditMode}>
            <Save size={18} />
            SALIR DE EDICIÓN
        </div>
    );
};

export default EditModeIndicator;
