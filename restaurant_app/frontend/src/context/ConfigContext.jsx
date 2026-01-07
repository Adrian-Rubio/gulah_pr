import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState({
        welcomeTitle: 'Una Experiencia Culinaria Inolvidable',
        welcomeSubtitle: 'Sabores auténticos, ambiente elegante y un servicio excepcional.',
        primaryColor: '#c1a35f',
    });

    // Temporally mocked until we seed the DB
    useEffect(() => {
        // In a real scenario: axios.get('/config').then(res => setSiteConfig(res.data))
    }, []);

    return (
        <ConfigContext.Provider value={{ siteConfig, setSiteConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
