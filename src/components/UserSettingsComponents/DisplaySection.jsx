import React from 'react';
import { Grid, List as ListIcon } from 'lucide-react';

const DisplaySection = ({ preferences, handlePreferenceChange }) => {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="bg-gradient-to-r from-pink-600 to-pink-400 px-6 py-4">
                <h2 className="text-lg font-medium text-white">Display Preferences</h2>
                <p className="text-pink-100 text-sm mt-1">Customize how your content is displayed</p>
            </div>
            
            <div className="p-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Papers per page
                        </label>
                        <select
                            value={preferences.papersPerPage}
                            onChange={(e) => handlePreferenceChange('papersPerPage', Number(e.target.value))}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md transition-all duration-200"
                        >
                            {[10, 20, 50].map(value => (
                                <option key={value} value={value}>
                                    {value} papers
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Default view
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handlePreferenceChange('listView', false)}
                                className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                    !preferences.listView
                                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                                        : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/50'
                                }`}
                            >
                                <Grid className={`h-5 w-5 mr-2 ${!preferences.listView ? 'text-pink-500' : 'text-gray-400'}`} />
                                <span className={!preferences.listView ? 'font-medium' : ''}>Grid</span>
                            </button>
                            <button
                                onClick={() => handlePreferenceChange('listView', true)}
                                className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                                    preferences.listView
                                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                                        : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/50'
                                }`}
                            >
                                <ListIcon className={`h-5 w-5 mr-2 ${preferences.listView ? 'text-pink-500' : 'text-gray-400'}`} />
                                <span className={preferences.listView ? 'font-medium' : ''}>List</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplaySection;
