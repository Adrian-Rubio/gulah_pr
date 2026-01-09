import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState({
        welcomeTitle: 'EL PLACER ES NUESTRO',
        welcomeSubtitle: "Bienvenido a Gulah, el templo de los auténticos Po'Boys. Aquí cada bocado es una explosión sin filtros.",
        address: 'Arturo Soria, 198, 28043, Madrid.',
        phone: '+34 912 345 678',
        email: 'info@gulahpoboys.com',
        reservation_email: 'reservas@gulahpoboys.com',
        hours: 'Lunes a Viernes: 10am-24pm | Sábados y Domingos: 13pm-24pm'
    });

    const fetchConfig = async () => {
        try {
            console.log("Fetching config from:", `${import.meta.env.VITE_API_URL}/config`);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/config`);
            if (Object.keys(res.data).length > 0) {
                // Flatten contact_info if it exists or use direct keys
                const newConfig = { ...siteConfig, ...res.data };
                if (res.data.contact_info) {
                    Object.assign(newConfig, res.data.contact_info);
                }
                setSiteConfig(newConfig);
            }
        } catch (err) {
            console.error("CRITICAL: Error fetching config from", `${import.meta.env.VITE_API_URL}/config`);
            console.error("Please ensure the backend is running and listening on 0.0.0.0:8000");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const updateConfigByKey = async (key, value) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/admin/config`, { key, value });
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
