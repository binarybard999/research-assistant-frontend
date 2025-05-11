import React from 'react';
import { Bell } from 'lucide-react';

const NotificationSection = ({ notifications, handleNotificationChange }) => {
    const notificationOptions = [
        { key: 'paperUploads', label: 'Paper upload confirmations' },
        { key: 'recommendations', label: 'Paper recommendations' },
        { key: 'paperSummaries', label: 'AI-generated paper summaries' }
    ];

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 px-6 py-4">
                <h2 className="text-lg font-medium text-white">Email Notifications</h2>
                <p className="text-yellow-100 text-sm mt-1">Choose what you want to be notified about</p>
            </div>
            
            <div className="p-6">
                <div className="space-y-4">
                    {notificationOptions.map(({ key, label }) => (
                        <label key={key} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-yellow-50 transition-colors duration-200 cursor-pointer">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-yellow-600 rounded focus:ring-yellow-500 transition duration-150 ease-in-out"
                                checked={notifications[key]}
                                onChange={() => handleNotificationChange(key)}
                            />
                            <div className="ml-3">
                                <span className="text-gray-700">{label}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationSection;
