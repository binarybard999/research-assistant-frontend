import React from 'react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                    
                    <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600">
                                By accessing and using Research Assistant, you accept and agree to be bound by these 
                                Terms of Service. If you do not agree to these terms, please do not use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                            <p className="text-gray-600">
                                Research Assistant is a platform that provides AI-powered research paper analysis, 
                                organization, and collaboration tools. We reserve the right to modify, suspend, 
                                or discontinue any aspect of the service at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
                            <p className="text-gray-600">
                                You are responsible for:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-600">
                                <li>Maintaining account security</li>
                                <li>All activities under your account</li>
                                <li>Providing accurate account information</li>
                                <li>Notifying us of unauthorized access</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Intellectual Property</h2>
                            <p className="text-gray-600">
                                All content and functionality on Research Assistant is protected by intellectual 
                                property rights. Users retain rights to their uploaded content while granting us 
                                license to use it for service provision.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Acceptable Use</h2>
                            <p className="text-gray-600">
                                Users agree not to:
                            </p>
                            <ul className="list-disc pl-6 mt-2 text-gray-600">
                                <li>Violate any laws or regulations</li>
                                <li>Infringe on others' intellectual property</li>
                                <li>Upload malicious content</li>
                                <li>Attempt to breach system security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                            <p className="text-gray-600">
                                Research Assistant is provided "as is" without warranties of any kind. We are not 
                                liable for any damages arising from service use or interruption.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Information</h2>
                            <p className="text-gray-600">
                                For questions about these Terms, please contact:
                                <br />
                                <a href="mailto:legal@researchassistant.com" className="text-blue-600 hover:text-blue-700">
                                    legal@researchassistant.com
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

export default TermsOfService;
