import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                    
                    <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                            <p className="text-gray-600">
                                We collect information you provide directly to us, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-600">
                                <li>Name and contact information</li>
                                <li>Account credentials</li>
                                <li>Research preferences and interests</li>
                                <li>Usage data and analytics</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                            <p className="text-gray-600">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-600">
                                <li>Provide and improve our services</li>
                                <li>Personalize your experience</li>
                                <li>Communicate with you</li>
                                <li>Ensure platform security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Security</h2>
                            <p className="text-gray-600">
                                We implement appropriate security measures to protect your personal information. 
                                This includes encryption, secure servers, and regular security assessments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Rights</h2>
                            <p className="text-gray-600">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-600">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request data deletion</li>
                                <li>Object to data processing</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                            <p className="text-gray-600">
                                If you have any questions about our Privacy Policy, please contact us at:
                                <br />
                                <a href="mailto:privacy@researchassistant.com" className="text-blue-600 hover:text-blue-700">
                                    privacy@researchassistant.com
                                </a>
                            </p>
                        </section>
                    </div>

                    <p className="text-sm text-gray-500 mt-8 text-center">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
