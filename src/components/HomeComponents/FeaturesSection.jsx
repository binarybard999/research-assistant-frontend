import React from 'react';
import { FileText, Brain, Book, Users, ArrowRight } from 'lucide-react';

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

const FeaturesSection = () => {
    return (
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
                                <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
