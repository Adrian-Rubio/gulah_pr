import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Link } from 'react-router-dom';
import { Edit3, Check, X, Link as LinkIcon, Type } from 'lucide-react';

const EditableButton = ({ configKey, defaultText = 'Botón', defaultLink = '#', className = 'btn-primary' }) => {
    const { siteConfig, updateConfigByKey, isEditMode } = useConfig();
    const [isEditing, setIsEditing] = useState(false);

    // Config structure: { text: string, link: string, style: string }
    const config = siteConfig[configKey] || { text: defaultText, link: defaultLink, style: className };

    const [tempConfig, setTempConfig] = useState(config);

    useEffect(() => {
        setTempConfig(siteConfig[configKey] || { text: defaultText, link: defaultLink, style: className });
    }, [siteConfig, configKey]);

    const handleSave = async () => {
        await updateConfigByKey(configKey, tempConfig);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempConfig(config);
        setIsEditing(false);
    };

    if (!isEditMode) {
        return (
            <Link to={config.link} className={config.style}>
                {config.text}
            </Link>
        );
    }

    if (isEditing) {
        return (
            <div className="editable-button-popup shadow" style={{
                position: 'relative',
                display: 'inline-block',
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #eee',
                zIndex: 1000,
                minWidth: '250px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#999' }}>Texto</label>
                        <input
                            type="text"
                            value={tempConfig.text}
                            onChange={e => setTempConfig({ ...tempConfig, text: e.target.value })}
                            className="editable-input"
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#999' }}>Enlace (URL)</label>
                        <input
                            type="text"
                            value={tempConfig.link}
                            onChange={e => setTempConfig({ ...tempConfig, link: e.target.value })}
                            className="editable-input"
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#999' }}>Estilo</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setTempConfig({ ...tempConfig, style: 'btn-primary' })}
                                style={{
                                    flex: 1,
                                    padding: '5px',
                                    fontSize: '0.7rem',
                                    border: tempConfig.style === 'btn-primary' ? '2px solid var(--primary)' : '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: tempConfig.style === 'btn-primary' ? 'var(--provincial-pink)' : 'white'
                                }}
                            >
                                Sólido
                            </button>
                            <button
                                onClick={() => setTempConfig({ ...tempConfig, style: 'btn-secondary' })}
                                style={{
                                    flex: 1,
                                    padding: '5px',
                                    fontSize: '0.7rem',
                                    border: tempConfig.style === 'btn-secondary' ? '2px solid var(--primary)' : '1px solid #ddd',
                                    borderRadius: '4px',
                                    background: tempConfig.style === 'btn-secondary' ? 'var(--provincial-pink)' : 'white'
                                }}
                            >
                                Perfil
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button onClick={handleSave} className="btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}>Guardar</button>
                        <button onClick={handleCancel} className="btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}>Cerrar</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span className={config.style} style={{ opacity: 0.8, cursor: 'pointer' }} onClick={() => setIsEditing(true)}>
                {config.text}
            </span>
            <div
                onClick={() => setIsEditing(true)}
                style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    zIndex: 10
                }}
            >
                <Edit3 size={14} />
            </div>
        </div>
    );
};

export default EditableButton;
