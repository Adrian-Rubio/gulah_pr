import React, { createContext, useContext, useEffect, useState } from 'react';
import { useConfig } from './ConfigContext';

const ThemeContext = createContext();

/**
 * Theme Provider to manage global typography and styles.
 * It uses the SiteConfig to dynamicallly apply CSS variables.
 */
export const ThemeProvider = ({ children }) => {
    const { siteConfig } = useConfig();
    const [theme, setTheme] = useState({
        primaryFont: "'Druk Wide', sans-serif",
        secondaryFont: "'Druk Wide', sans-serif",
        baseFontSize: '16px'
    });

    useEffect(() => {
        // Typography configuration from the site configuration
        const typography = siteConfig.typography || {};

        const newTheme = {
            primaryFont: typography.primaryFont || "'Druk Wide', sans-serif",
            secondaryFont: typography.secondaryFont || "'Druk Wide', sans-serif",
            baseFontSize: typography.baseFontSize || '16px'
        };

        setTheme(newTheme);

        // Apply CSS variables to the document root
        document.documentElement.style.setProperty('--font-primary', newTheme.primaryFont);
        document.documentElement.style.setProperty('--font-secondary', newTheme.secondaryFont);
        document.documentElement.style.setProperty('--base-font-size', newTheme.baseFontSize);

        // Update root font size for REM units to work correctly
        document.documentElement.style.fontSize = newTheme.baseFontSize;

    }, [siteConfig.typography]);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Hook to access the current theme configuration.
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
