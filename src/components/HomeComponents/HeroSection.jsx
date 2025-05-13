import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, FileText, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

const HeroSection = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <section className="relative">
            <div className="container mx-auto px-4 pt-16 lg:pt-24 pb-16">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                        <div className="lg:pr-12">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                                <span className="text-blue-600">Transform</span> Your Research Process
                            </h1>
                            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                                Upload research papers, get AI-powered summaries, and organize your knowledge in one powerful platform designed for modern researchers.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                {!isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/register"
                                            className="flex items-center justify-center bg-blue-600 px-8 py-4 rounded-xl text-white font-medium hover:bg-blue-700 transition shadow-lg"
                                        >
                                            Start for free
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                        <Link
                                            to="/demo"
                                            className="flex items-center justify-center px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                                        >
                                            Watch demo
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center justify-center bg-blue-600 px-8 py-4 rounded-xl text-white font-medium hover:bg-blue-700 transition shadow-lg"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                )}
                            </div>
                            <div className="mt-8 flex items-center">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(index => (
                                        <div key={index} className={`h-8 w-8 rounded-full bg-blue-${index}00 border-2 border-white flex items-center justify-center`}>
                                            <User className={`h-4 w-4 text-blue-${10 - index}00`} />
                                        </div>
                                    ))}
                                </div>
                                <span className="ml-3 text-sm text-gray-600">Join 5,000+ researchers</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200">
                            <div className="p-1 bg-gradient-to-r from-blue-400 to-blue-600">
                                <div className="flex space-x-2 px-3 py-1">
                                    <div className="rounded-full h-3 w-3 bg-red-500"></div>
                                    <div className="rounded-full h-3 w-3 bg-yellow-500"></div>
                                    <div className="rounded-full h-3 w-3 bg-green-500"></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                        <FileText className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium">ResearchPaper.pdf</h3>
                                        <p className="text-sm text-gray-500">Uploaded 2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-center mb-2">
                                        <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                                        <h4 className="font-medium">AI Summary</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">This research investigates the effects of neural networks on climate prediction models, showing a 34% improvement in accuracy when compared to traditional methods...</p>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Machine Learning</span>
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Climate Research</span>
                                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Neural Networks</span>
                                </div>
                                <div className="flex justify-between">
                                    <button className="text-blue-600 text-sm font-medium">View details</button>
                                    <div className="flex space-x-2">
                                        <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                                            <User className="h-4 w-4 text-gray-600" />
                                        </button>
                                        <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                                            <Search className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
