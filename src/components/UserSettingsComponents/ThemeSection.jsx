import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeSection = ({ theme, handleThemeChange }) => {
    const themes = [
        { key: 'light', icon: Sun, label: 'Light' },
        { key: 'dark', icon: Moon, label: 'Dark' },
        { key: 'system', icon: Monitor, label: 'System' }
    ];

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 px-6 py-4">
                <h2 className="text-lg font-medium text-white">Theme</h2>
                <p className="text-indigo-100 text-sm mt-1">Choose your preferred color theme</p>
            </div>
            
            <div className="p-6">
                <div className="flex flex-wrap gap-4">
                    {themes.map(({ key, icon: Icon, label }) => (
                        <button
                            key={key}
                            onClick={() => handleThemeChange(key)}
                            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                theme === key
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'
                            }`}
                        >
                            <Icon className={`h-5 w-5 mr-2 ${theme === key ? 'text-indigo-500' : 'text-gray-400'}`} />
                            <span className={theme === key ? 'font-medium' : ''}>{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSection;
