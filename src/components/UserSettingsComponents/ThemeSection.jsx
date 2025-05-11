import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

const ThemeSection = ({ theme, handleThemeChange }) => {
    const themes = [
        { key: 'light', icon: Sun, label: 'Light', description: 'Bright interface for daytime use' },
        { key: 'dark', icon: Moon, label: 'Dark', description: 'Easy on the eyes in low-light environments' },
        { key: 'system', icon: Monitor, label: 'System', description: 'Follow your device settings' }
    ];

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300">
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">Theme</h2>
                <p className="text-indigo-100 text-sm mt-1">Choose your preferred color theme</p>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {themes.map(({ key, icon: Icon, label, description }) => (
                        <button
                            key={key}
                            onClick={() => handleThemeChange(key)}
                            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${theme === key
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg'
                                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                                }`}
                        >
                            <Icon className={`h-8 w-8 mb-3 ${theme === key ? 'text-indigo-500' : 'text-gray-400'}`} />
                            <span className={`text-lg ${theme === key ? 'font-semibold' : ''}`}>{label}</span>
                            <p className="text-sm text-gray-500 mt-2 text-center">{description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSection;
