import React from 'react';
import { Tag } from 'lucide-react';

const ResearchInterestsSection = ({ researchInterests, handleResearchInterestChange }) => {
    const interests = researchInterests.join(', ');

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg mt-6">
            <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-4">
                <h2 className="text-lg font-medium text-white">Research Interests</h2>
                <p className="text-green-100 text-sm mt-1">Share your research areas and expertise</p>
            </div>
            
            <div className="p-6">
                <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={interests}
                        onChange={(e) => handleResearchInterestChange(e.target.value)}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200"
                        placeholder="AI, Machine Learning, Natural Language Processing, ..."
                    />
                </div>
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Separate interests with commas
                </p>

                {researchInterests.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {researchInterests.map((interest, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResearchInterestsSection;
