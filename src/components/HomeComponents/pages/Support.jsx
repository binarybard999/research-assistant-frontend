import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';

const Support = () => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', contactForm);
    };

    const handleChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const supportChannels = [
        {
            icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
            title: 'Live Chat',
            description: 'Chat with our support team in real-time',
            availability: 'Available 24/7'
        },
        {
            icon: <Mail className="h-6 w-6 text-blue-600" />,
            title: 'Email Support',
            description: 'Send us an email, we\'ll respond within 24 hours',
            availability: 'support@researchassistant.com'
        },
        {
            icon: <Phone className="h-6 w-6 text-blue-600" />,
            title: 'Phone Support',
            description: 'Call us for immediate assistance',
            availability: '+1 (555) 123-4567'
        },
        {
            icon: <Clock className="h-6 w-6 text-blue-600" />,
            title: 'Support Hours',
            description: 'Our team is here to help',
            availability: 'Mon-Fri: 9AM-6PM EST'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
                    <p className="text-xl text-gray-600">
                        Get in touch with our support team through any of these channels
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {supportChannels.map((channel, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                                {channel.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{channel.title}</h3>
                            <p className="text-gray-600 mb-2">{channel.description}</p>
                            <p className="text-blue-600 font-medium">{channel.availability}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={contactForm.subject}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={contactForm.message}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;
