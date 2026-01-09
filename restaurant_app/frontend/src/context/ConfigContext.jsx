import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState({
        welcomeTitle: 'EL PLACER ES NUESTRO',
        welcomeSubtitle: "Bienvenido a Gulah, el templo de los auténticos Po'Boys. Aquí cada bocado es una explosión sin filtros.",
        address: 'Arturo Soria, 198, 28043, Madrid.',
        phone: '+34 912 345 678',
        email: 'info@gulahpoboys.com',
        reservation_email: 'reservas@gulahpoboys.com',
        hours: 'Lunes a Viernes: 10 am - 24 pm | Sábados y Domingos: 13 pm - 24 pm'
    });

    const fetchConfig = async () => {
        try {
            const res = await axios.get(`${API_URL}/config`);
            if (Object.keys(res.data).length > 0) {
                // Flatten contact_info if it exists or use direct keys
                const newConfig = { ...siteConfig, ...res.data };
                if (res.data.contact_info) {
                    Object.assign(newConfig, res.data.contact_info);
                }
                setSiteConfig(newConfig);
            }
        } catch (err) {
            console.error("Error fetching config", err);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const updateConfigByKey = async (key, value) => {
        try {
            await axios.post(`${API_URL}/admin/config`, { key, value });
            fetchConfig(); // Refresh after update
        } catch (err) {
            console.error("Error updating config", err);
        }
    };

    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => setIsEditMode(prev => !prev);

    return (
        <ConfigContext.Provider value={{
            siteConfig,
            setSiteConfig,
            updateConfigByKey,
            fetchConfig,
            isEditMode,
            toggleEditMode
        }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
