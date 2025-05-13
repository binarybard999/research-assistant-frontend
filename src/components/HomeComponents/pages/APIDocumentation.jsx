import React from 'react';
import { Code, Key, Lock, Zap, Book, Terminal } from 'lucide-react';

const APIDocumentation = () => {
    const endpoints = [
        {
            method: 'POST',
            path: '/api/papers/upload',
            description: 'Upload a research paper for analysis',
            parameters: [
                { name: 'file', type: 'File', description: 'PDF file of the paper' },
                { name: 'title', type: 'String', description: 'Title of the paper' },
                { name: 'authors', type: 'Array', description: 'List of authors' }
            ]
        },
        {
            method: 'GET',
            path: '/api/papers/{id}',
            description: 'Retrieve a specific paper\'s details',
            parameters: [
                { name: 'id', type: 'String', description: 'Unique identifier of the paper' }
            ]
        },
        {
            method: 'POST',
            path: '/api/papers/{id}/analyze',
            description: 'Generate AI analysis for a paper',
            parameters: [
                { name: 'id', type: 'String', description: 'Paper ID' },
                { name: 'type', type: 'String', description: 'Type of analysis (summary/detailed)' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            API Documentation
                        </h1>
                        <p className="text-xl text-gray-600">
                            Integrate Research Assistant's powerful features into your own applications
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Getting Started */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
                        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                            <div className="flex items-start">
                                <Key className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
                                    <p className="text-gray-600 mb-4">
                                        All API requests require an API key to be included in the header:
                                    </p>
                                    <div className="bg-gray-800 text-gray-200 rounded-lg p-4">
                                        <code>
                                            Authorization: Bearer YOUR_API_KEY
                                        </code>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Lock className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Rate Limiting</h3>
                                    <p className="text-gray-600">
                                        Free tier: 1000 requests per day<br />
                                        Pro tier: 10000 requests per day<br />
                                        Enterprise: Custom limits
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Endpoints */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
                        <div className="space-y-6">
                            {endpoints.map((endpoint, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <span className={`px-3 py-1 rounded-lg text-sm font-medium mr-3 
                                            ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 
                                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' : 
                                              'bg-yellow-100 text-yellow-800'}`}>
                                            {endpoint.method}
                                        </span>
                                        <code className="text-gray-900 font-mono">{endpoint.path}</code>
                                    </div>
                                    <p className="text-gray-600 mb-4">{endpoint.description}</p>
                                    
                                    {endpoint.parameters.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <table className="min-w-full">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-left text-sm font-medium text-gray-500">Name</th>
                                                            <th className="text-left text-sm font-medium text-gray-500">Type</th>
                                                            <th className="text-left text-sm font-medium text-gray-500">Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {endpoint.parameters.map((param, paramIndex) => (
                                                            <tr key={paramIndex}>
                                                                <td className="py-2 text-sm text-gray-900">{param.name}</td>
                                                                <td className="py-2 text-sm text-blue-600">{param.type}</td>
                                                                <td className="py-2 text-sm text-gray-600">{param.description}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SDK Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">SDKs & Libraries</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <Terminal className="h-8 w-8 text-blue-600 mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Python SDK</h3>
                                <p className="text-gray-600 mb-4">
                                    Official Python library for the Research Assistant API.
                                </p>
                                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                    View Documentation →
                                </a>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <Code className="h-8 w-8 text-blue-600 mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">JavaScript SDK</h3>
                                <p className="text-gray-600 mb-4">
                                    Official JavaScript/Node.js library for the Research Assistant API.
                                </p>
                                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                                    View Documentation →
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section>
                        <div className="bg-blue-600 rounded-xl p-8 text-center">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-blue-100 mb-6">
                                Sign up for an API key and start integrating Research Assistant into your applications.
                            </p>
                            <a
                                href="/register"
                                className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Get Your API Key
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default APIDocumentation;
