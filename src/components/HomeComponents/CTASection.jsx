import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CTASection = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
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
    );
};

export default CTASection;
