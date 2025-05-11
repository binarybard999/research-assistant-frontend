import React from 'react';
import { Link2 } from 'lucide-react';

const SocialLinksSection = ({ socialLinks, handleSocialLinkChange }) => {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg mt-6">
            <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-4">
                <h2 className="text-lg font-medium text-white">Social Links</h2>
                <p className="text-purple-100 text-sm mt-1">Connect your academic and professional profiles</p>
            </div>
            
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { name: 'googleScholar', label: 'Google Scholar', placeholder: 'https://scholar.google.com/...' },
                        { name: 'researchGate', label: 'ResearchGate', placeholder: 'https://www.researchgate.net/...' },
                        { name: 'orcid', label: 'ORCID', placeholder: 'https://orcid.org/...' },
                        { name: 'linkedin', label: 'LinkedIn', placeholder: 'https://www.linkedin.com/in/...' }
                    ].map((platform) => (
                        <div key={platform.name} className="relative group">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {platform.label}
                            </label>
                            <div className="relative">
                                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                                <input
                                    type="url"
                                    value={socialLinks[platform.name]}
                                    onChange={(e) => handleSocialLinkChange(platform.name, e.target.value)}
                                    className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-200"
                                    placeholder={platform.placeholder}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialLinksSection;
