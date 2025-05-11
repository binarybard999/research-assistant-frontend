import React from 'react';
import { Grid, List as ListIcon } from 'lucide-react';

const DisplaySection = ({ preferences, handlePreferenceChange }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300">
            <div className="bg-gradient-to-r from-pink-700 to-pink-500 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">Display Preferences</h2>
                <p className="text-pink-100 text-sm mt-1">Customize how your content is displayed</p>
            </div>

            <div className="p-6">
                <div className="space-y-8">
                    <div>
                        <label className="block text-lg font-medium text-gray-800 mb-3">
                            Papers per page
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[10, 20, 50].map(value => (
                                <button
                                    key={value}
                                    onClick={() => handlePreferenceChange('papersPerPage', value)}
                                    className={`flex items-center justify-center px-4 py-4 rounded-lg border-2 transition-all duration-200 ${preferences.papersPerPage === value
                                            ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                                            : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/50'
                                        }`}
                                >
                                    <span className={preferences.papersPerPage === value ? 'font-semibold text-lg' : 'text-lg'}>
                                        {value} papers
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-800 mb-3">
                            Default view
                        </label>
                        <div className="grid grid-cols-2 gap-5">
                            <button
                                onClick={() => handlePreferenceChange('listView', false)}
                                className={`flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 transition-all duration-300 ${!preferences.listView
                                        ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-lg'
                                        : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/50'
                                    }`}
                            >
                                <Grid className={`h-8 w-8 mb-2 ${!preferences.listView ? 'text-pink-500' : 'text-gray-400'}`} />
                                <span className={`text-lg ${!preferences.listView ? 'font-semibold' : ''}`}>Grid View</span>
                                <p className="text-sm text-gray-500 mt-2">Compact tiles with preview images</p>
                            </button>
                            <button
                                onClick={() => handlePreferenceChange('listView', true)}
                                className={`flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 transition-all duration-300 ${preferences.listView
                                        ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-lg'
                                        : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/50'
                                    }`}
                            >
                                <ListIcon className={`h-8 w-8 mb-2 ${preferences.listView ? 'text-pink-500' : 'text-gray-400'}`} />
                                <span className={`text-lg ${preferences.listView ? 'font-semibold' : ''}`}>List View</span>
                                <p className="text-sm text-gray-500 mt-2">Detailed list with more information</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplaySection;
