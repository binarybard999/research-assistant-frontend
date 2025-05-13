import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Demo = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            See Research Assistant in Action
                        </h1>
                        <p className="text-xl text-gray-600">
                            Watch how our AI-powered platform transforms the research process
                        </p>
                    </div>

                    {/* Main Demo Video */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                            <div className="flex items-center justify-center">
                                <Play className="h-20 w-20 text-white opacity-80" />
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Platform Overview
                            </h2>
                            <p className="text-gray-600">
                                Learn how Research Assistant helps you analyze papers, generate summaries, 
                                and collaborate with your team.
                            </p>
                        </div>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                AI-Powered Analysis
                            </h3>
                            <p className="text-gray-600 mb-4">
                                See how our AI generates comprehensive summaries and extracts key insights 
                                from research papers.
                            </p>
                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                Watch Demo →
                            </button>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Collaboration Tools
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Learn how to share papers, annotations, and insights with your research team.
                            </p>
                            <button className="text-blue-600 font-medium hover:text-blue-700">
                                Watch Demo →
                            </button>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to Get Started?
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/pricing"
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;
