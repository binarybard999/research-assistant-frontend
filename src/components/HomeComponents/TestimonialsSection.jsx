import React from 'react';

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

const TestimonialsSection = () => {
    return (
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
    );
};

export default TestimonialsSection;
