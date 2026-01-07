import React, { useState, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Check, X, Edit3, Type } from 'lucide-react';

const EditableText = ({ configKey, tag: Tag = 'span', className = '', renderValue, style: extraStyle = {}, ...props }) => {
    const { siteConfig, updateConfigByKey, isEditMode } = useConfig();
    const [isEditing, setIsEditing] = useState(false);
    const [showStylePanel, setShowStylePanel] = useState(false);
    const [value, setValue] = useState(siteConfig[configKey] || '');

    const styleKey = `${configKey}_style`;
    const currentStyle = siteConfig[styleKey] || { fontFamily: 'inherit' };

    useEffect(() => {
        setValue(siteConfig[configKey] || '');
    }, [siteConfig, configKey]);

    const handleSave = async () => {
        await updateConfigByKey(configKey, value);
        setIsEditing(false);
        setShowStylePanel(false);
    };

    const handleCancel = () => {
        setValue(siteConfig[configKey] || '');
        setIsEditing(false);
        setShowStylePanel(false);
    };

    const updateStyle = async (newStyle) => {
        const updated = { ...currentStyle, ...newStyle };
        await updateConfigByKey(styleKey, updated);
    };

    const fonts = [
        { name: 'Predeterminada', value: 'inherit' },
        { name: 'Moderna (Inter)', value: 'var(--font-main)' },
        { name: 'Display (Outfit)', value: 'var(--font-bold)' },
        { name: 'Elegante (Serif)', value: 'var(--font-elegant)' },
        { name: 'Minimalista (Modern)', value: 'var(--font-modern)' }
    ];

    const elementStyle = {
        ...extraStyle,
        fontFamily: currentStyle.fontFamily
    };

    if (!isEditMode) {
        return (
            <Tag className={className} style={elementStyle} {...props}>
                {renderValue ? renderValue(siteConfig[configKey]) : siteConfig[configKey]}
            </Tag>
        );
    }

    if (isEditing) {
        return (
            <div className={`editable-input-container ${className}`} style={{ display: 'inline-block', position: 'relative', minWidth: '100px' }}>
                {Tag === 'p' || Tag === 'textarea' ? (
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="editable-textarea"
                        style={elementStyle}
                        autoFocus
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="editable-input"
                        style={elementStyle}
                        autoFocus
                    />
                )}

                <div className="editable-controls">
                    <button onClick={() => setShowStylePanel(!showStylePanel)} title="Estilo de fuente">
                        <Type size={14} />
                    </button>
                    <button onClick={handleSave} className="save-btn"><Check size={14} /></button>
                    <button onClick={handleCancel} className="cancel-btn"><X size={14} /></button>
                </div>

                {showStylePanel && (
                    <div className="style-panel fade-in" style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: 'white',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '10px',
                        zIndex: 100,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        width: '200px',
                        marginTop: '5px'
                    }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>Tipografía</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {fonts.map(f => (
                                <button
                                    key={f.value}
                                    onClick={() => updateStyle({ fontFamily: f.value })}
                                    style={{
                                        padding: '5px 10px',
                                        fontSize: '0.85rem',
                                        textAlign: 'left',
                                        background: currentStyle.fontFamily === f.value ? 'var(--provincial-pink)' : 'transparent',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontFamily: f.value
                                    }}
                                >
                                    {f.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <Tag
            className={`editable-preview ${className}`}
            onClick={() => setIsEditing(true)}
            style={{
                ...elementStyle,
                cursor: 'pointer',
                border: '1px dashed var(--primary)',
                padding: '2px 4px',
                borderRadius: '4px',
                position: 'relative',
                display: 'inline-block'
            }}
            {...props}
        >
            {renderValue ? renderValue(siteConfig[configKey]) : siteConfig[configKey]}
            <Edit3 size={12} style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', borderRadius: '50%', padding: '2px' }} />
        </Tag>
    );
};

export default EditableText;
