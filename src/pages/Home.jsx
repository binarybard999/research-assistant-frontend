import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    FileText,
    Book,
    Users,
    Search,
    ArrowRight,
    Brain,
    Sparkles
} from 'lucide-react';

const Home = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    const features = [
        {
            icon: <FileText className="h-10 w-10 text-blue-600" />,
            title: 'Upload Papers',
            description: 'Easily upload and analyze research papers in various formats including PDF, DOCX, and more.',
        },
        {
            icon: <Brain className="h-10 w-10 text-blue-600" />,
            title: 'Smart Analysis',
            description: 'Get AI-powered summaries, key findings, and insights from your research papers.',
        },
        {
            icon: <Book className="h-10 w-10 text-blue-600" />,
            title: 'Research Library',
            description: 'Organize your papers in a personal library with custom tags and categories.',
        },
        {
            icon: <Users className="h-10 w-10 text-blue-600" />,
            title: 'Collaboration',
            description: 'Share papers with colleagues and collaborate on research projects.',
        },
    ];

    const testimonials = [
        {
            quote: "Research Assistant has completely transformed how I manage my literature review. I've saved countless hours.",
            author: "Dr. Sarah Chen",
            role: "Professor of Neuroscience"
        },
        {
            quote: "The AI-powered summaries helped me quickly grasp complex papers outside my field. Game changer for interdisciplinary research.",
            author: "Michael Rodriguez",
            role: "PhD Candidate"
        },
        {
            quote: "I love how I can collaborate with my team on shared papers. The organization features are intuitive and powerful.",
            author: "Dr. James Wilson",
            role: "Research Director"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Hero Section */}
            <section>
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
                                                <Users className={`h-4 w-4 text-blue-${10 - index}00`} />
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
                                                <Users className="h-4 w-4 text-gray-600" />
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

            {/* Features Section */}
            <section className="bg-white py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">POWERFUL FEATURES</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Everything you need to excel in research
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                            Tools designed specifically for researchers to manage, analyze, and collaborate on papers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 hover:border-blue-100"
                            >
                                <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                                <div className="mt-4">
                                    <Link to="/features" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gradient-to-b from-white to-blue-50 py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">TESTIMONIALS</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Trusted by researchers worldwide
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                            See how Research Assistant is helping academics and scientists save time and improve their work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                                <div className="flex mb-6">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="w-full lg:w-2/3 text-center lg:text-left mb-8 lg:mb-0">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Ready to revolutionize your research?
                            </h2>
                            <p className="mt-4 text-xl text-blue-100 max-w-2xl">
                                Join thousands of researchers who are using Research Assistant to accelerate their work and make breakthrough discoveries.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                            {!isAuthenticated ? (
                                <Link
                                    to="/register"
                                    className="bg-white px-8 py-4 rounded-xl text-blue-600 font-medium hover:bg-gray-100 transition shadow-md text-center inline-block"
                                >
                                    Start your free trial today
                                </Link>
                            ) : (
                                <Link
                                    to="/dashboard"
                                    className="bg-white px-8 py-4 rounded-xl text-blue-600 font-medium hover:bg-gray-100 transition shadow-md text-center inline-block"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;