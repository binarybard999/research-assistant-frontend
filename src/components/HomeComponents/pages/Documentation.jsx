import React from 'react';
import { Book, Search, Code, Coffee } from 'lucide-react';

const Documentation = () => {
    const sections = [
        {
            icon: <Book className="h-6 w-6 text-blue-600" />,
            title: 'Getting Started',
            description: 'Learn the basics of Research Assistant and set up your account.',
            links: [
                { text: 'Quick Start Guide', url: '#quick-start' },
                { text: 'Account Setup', url: '#account-setup' },
                { text: 'Basic Features', url: '#features' }
            ]
        },
        {
            icon: <Search className="h-6 w-6 text-blue-600" />,
            title: 'Using the Platform',
            description: 'Detailed guides on using Research Assistant features.',
            links: [
                { text: 'Paper Upload & Analysis', url: '#upload' },
                { text: 'AI Summary Generation', url: '#ai-summary' },
                { text: 'Library Management', url: '#library' }
            ]
        },
        {
            icon: <Code className="h-6 w-6 text-blue-600" />,
            title: 'API Documentation',
            description: 'Technical documentation for developers.',
            links: [
                { text: 'API Reference', url: '#api-ref' },
                { text: 'Authentication', url: '#auth' },
                { text: 'Rate Limits', url: '#limits' }
            ]
        },
        {
            icon: <Coffee className="h-6 w-6 text-blue-600" />,
            title: 'Resources',
            description: 'Additional resources and support materials.',
            links: [
                { text: 'FAQs', url: '#faqs' },
                { text: 'Tutorials', url: '#tutorials' },
                { text: 'Best Practices', url: '#best-practices' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
                    <p className="mt-2 text-gray-600">
                        Everything you need to know about using Research Assistant effectively.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {section.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {section.description}
                            </p>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a 
                                            href={link.url} 
                                            className="text-blue-600 hover:text-blue-700 flex items-center"
                                        >
                                            <span className="mr-2">→</span>
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-blue-50 rounded-xl p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Need More Help?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Can't find what you're looking for in the documentation? Our support team is here to help.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a 
                            href="#contact" 
                            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Contact Support
                        </a>
                        <a 
                            href="#community" 
                            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Join Community
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
