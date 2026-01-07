import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState({
        welcomeTitle: 'EXPLOSIÓN DE SABORES SIN FILTROS',
        welcomeSubtitle: 'Auténtica street food con el toque salvaje de Gulah.',
        address: 'Calle Gastronomía 123, Madrid',
        phone: '+34 912 345 678',
        email: 'info@restaurante-gulah.com',
        reservation_email: 'reservas@restaurante-gulah.com',
        hours: 'Lunes - Domingo: 13:00 - 00:00'
    });

    const fetchConfig = async () => {
        try {
            const res = await axios.get('http://localhost:8000/config');
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
            await axios.post('http://localhost:8000/admin/config', { key, value });
            fetchConfig(); // Refresh after update
        } catch (err) {
            console.error("Error updating config", err);
        }
    };

    return (
        <ConfigContext.Provider value={{ siteConfig, setSiteConfig, updateConfigByKey, fetchConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
