import React, { useState, useRef } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { Camera, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';

const EditableImage = ({ configKey, defaultSrc, alt = '', className = '', ...props }) => {
    const { siteConfig, updateConfigByKey, isEditMode } = useConfig();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const currentSrc = siteConfig[configKey] || defaultSrc;

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Updated to point to backend URL if needed, but assuming relative works if proxied
            const res = await axios.post(`${API_URL}/admin/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // The backend returns a URL like /static/uploads/...
            // We need to make sure this is reachable.
            let uploadedUrl = res.data.url;
            if (uploadedUrl.startsWith('/')) {
                uploadedUrl = `${API_URL}${uploadedUrl}`;
            }

            await updateConfigByKey(configKey, uploadedUrl);
        } catch (err) {
            console.error("Error uploading image", err);
            alert("Error al subir la imagen");
        } finally {
            setIsUploading(false);
        }
    };

    if (!isEditMode) {
        return <img src={currentSrc} alt={alt} className={className} {...props} />;
    }

    return (
        <div className={`editable-image-container ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={currentSrc} alt={alt} style={{ width: '100%', height: '100%', display: 'block' }} {...props} />

            <div className="editable-image-overlay" onClick={() => fileInputRef.current?.click()} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255, 74, 31, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                opacity: 0,
                transition: 'opacity 0.3s ease'
            }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0}>
                {isUploading ? <RefreshCw className="animate-spin" size={32} /> : <Camera size={32} />}
                <span style={{ fontWeight: '700', marginTop: '10px' }}>
                    {isUploading ? "Subiendo..." : "Cambiar Imagen"}
                </span>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default EditableImage;
