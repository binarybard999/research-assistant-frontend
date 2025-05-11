import React from 'react';
import { Bell } from 'lucide-react';

const NotificationSection = ({ notifications, handleNotificationChange }) => {
    const notificationOptions = [
        { key: 'paperUploads', label: 'Paper upload confirmations', description: 'Get notified when your papers are successfully uploaded' },
        { key: 'recommendations', label: 'Paper recommendations', description: 'Receive personalized paper recommendations based on your interests' },
        { key: 'paperSummaries', label: 'AI-generated paper summaries', description: 'Get AI-powered summaries of new research papers' }
    ];

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300">
            <div className="bg-gradient-to-r from-yellow-600 to-amber-500 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">Email Notifications</h2>
                <p className="text-yellow-100 text-sm mt-1">Choose what you want to be notified about</p>
            </div>

            <div className="p-6">
                <div className="space-y-4">
                    {notificationOptions.map(({ key, label, description }) => (
                        <label key={key} className="flex items-start p-4 rounded-lg border border-gray-200 hover:bg-yellow-50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-yellow-600 rounded focus:ring-yellow-500 transition duration-150 ease-in-out"
                                    checked={notifications[key]}
                                    onChange={() => handleNotificationChange(key)}
                                />
                            </div>
                            <div className="ml-3">
                                <span className="text-gray-800 font-medium">{label}</span>
                                <p className="text-gray-500 text-sm mt-1">{description}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationSection;
