import React from 'react';
import { Users, Target, Globe, Award } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Active Users', value: '5,000+', icon: <Users className="h-6 w-6 text-blue-600" /> },
        { label: 'Research Papers', value: '100,000+', icon: <Target className="h-6 w-6 text-blue-600" /> },
        { label: 'Countries', value: '50+', icon: <Globe className="h-6 w-6 text-blue-600" /> },
        { label: 'Universities', value: '200+', icon: <Award className="h-6 w-6 text-blue-600" /> }
    ];

    const team = [
        {
            name: 'Dr. Sarah Chen',
            role: 'Founder & CEO',
            bio: 'Former research scientist with 15+ years experience in AI and machine learning.',
            image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=0D8ABC&color=fff'
        },
        {
            name: 'Michael Roberts',
            role: 'Chief Technology Officer',
            bio: 'Tech leader with expertise in AI and natural language processing.',
            image: 'https://ui-avatars.com/api/?name=Michael+Roberts&background=0D8ABC&color=fff'
        },
        {
            name: 'Dr. Emily Martinez',
            role: 'Head of Research',
            bio: 'PhD in Computer Science, specializing in machine learning and data analysis.',
            image: 'https://ui-avatars.com/api/?name=Emily+Martinez&background=0D8ABC&color=fff'
        },
        {
            name: 'James Wilson',
            role: 'Head of Product',
            bio: 'Product strategist with background in academic research tools.',
            image: 'https://ui-avatars.com/api/?name=James+Wilson&background=0D8ABC&color=fff'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            About Research Assistant
                        </h1>
                        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                            We're transforming how researchers work with AI-powered tools that make research 
                            more efficient, collaborative, and impactful.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-blue-600">
                <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-blue-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
                    <p className="text-xl text-gray-600">
                        To empower researchers worldwide with cutting-edge AI tools that accelerate 
                        scientific discovery and knowledge sharing. We believe in making research 
                        more accessible, efficient, and collaborative.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
                        <p className="mt-4 text-xl text-gray-600">
                            Experts in research, technology, and innovation
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-4">
                                    <img
                                        className="w-32 h-32 rounded-full mx-auto"
                                        src={member.image}
                                        alt={member.name}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-blue-600 mb-2">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50">
                <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Have questions about Research Assistant? We'd love to hear from you.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
