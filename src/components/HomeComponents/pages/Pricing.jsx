import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const plans = [
        {
            name: 'Free',
            price: '0',
            description: 'Perfect for trying out Research Assistant',
            features: [
                'Up to 10 papers per month',
                'Basic AI summaries',
                'Personal library',
                'Basic search functionality',
                'Email support'
            ],
            button: 'Get Started',
            highlighted: false
        },
        {
            name: 'Pro',
            price: '19',
            description: 'For serious researchers and academics',
            features: [
                'Unlimited papers',
                'Advanced AI analysis',
                'Collaboration tools',
                'Citation management',
                'Priority support',
                'Custom organization',
                'API access'
            ],
            button: 'Start Pro Trial',
            highlighted: true
        },
        {
            name: 'Team',
            price: '49',
            description: 'For research groups and departments',
            features: [
                'Everything in Pro',
                'Team collaboration',
                'Admin controls',
                'Usage analytics',
                'Training sessions',
                'Dedicated support',
                'Custom integrations'
            ],
            button: 'Contact Sales',
            highlighted: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that best fits your research needs. 
                        All plans include our core features.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl shadow-lg overflow-hidden ${
                                plan.highlighted 
                                    ? 'bg-white ring-4 ring-blue-600 transform scale-105' 
                                    : 'bg-white'
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-center py-2 text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                    <span className="text-gray-600 ml-1">/month</span>
                                </div>
                                <p className="text-gray-600 mb-8">{plan.description}</p>
                                <Link
                                    to={plan.name === 'Team' ? '/contact' : '/register'}
                                    className={`block w-full text-center rounded-lg px-6 py-3 text-base font-medium ${
                                        plan.highlighted
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}
                                >
                                    {plan.button}
                                </Link>
                            </div>
                            <div className="bg-gray-50 px-8 py-6">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start">
                                            <Check className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Can I change plans later?
                            </h3>
                            <p className="text-gray-600">
                                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Is there a student discount?
                            </h3>
                            <p className="text-gray-600">
                                Yes! Students with a valid academic email address can get 50% off the Pro plan.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                What payment methods do you accept?
                            </h3>
                            <p className="text-gray-600">
                                We accept all major credit cards, PayPal, and wire transfers for Team plans.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
