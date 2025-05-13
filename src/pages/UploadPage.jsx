import React from 'react';
import UploadForm from './upload/UploadForm';

const UploadPage = () => {
    return (
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Upload Papers</h1>
                <p className="text-gray-600">Upload your research papers for analysis and management</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main content - upload form */}
                <div className="lg:col-span-8">
                    <UploadForm />
                </div>

                {/* Sidebar with help information */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="font-bold text-lg mb-4">Upload Tips</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold mt-0.5">1.</span>
                                <span className="text-sm">Upload multiple PDFs at once to save time</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold mt-0.5">2.</span>
                                <span className="text-sm">Make sure all papers are in PDF format</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold mt-0.5">3.</span>
                                <span className="text-sm">Enter accurate title and author information for better search results</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold mt-0.5">4.</span>
                                <span className="text-sm">Add an abstract to improve paper categorization</span>
                            </li>
                        </ul>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <h4 className="font-semibold text-blue-700 mb-2">Need Help?</h4>
                            <p className="text-sm text-blue-600 mb-3">
                                Having trouble with your uploads? Contact our support team for assistance.
                            </p>
                            <a href="#" className="inline-block text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;