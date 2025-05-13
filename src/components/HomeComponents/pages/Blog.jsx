import React from 'react';
import { Calendar, User, Clock, Tag, ArrowRight } from 'lucide-react';

const Blog = () => {
    const blogPosts = [
        {
            title: 'Revolutionizing Research with AI',
            excerpt: 'How artificial intelligence is transforming the way researchers analyze and understand academic papers.',
            author: 'Dr. Sarah Chen',
            date: '2025-05-01',
            readTime: '5 min read',
            tags: ['AI', 'Research', 'Machine Learning'],
            image: 'https://picsum.photos/800/400'
        },
        {
            title: 'Best Practices for Academic Paper Organization',
            excerpt: 'Learn how to effectively organize your research papers and boost your productivity.',
            author: 'Michael Roberts',
            date: '2025-04-28',
            readTime: '4 min read',
            tags: ['Organization', 'Productivity', 'Research'],
            image: 'https://picsum.photos/800/401'
        },
        {
            title: 'The Future of Academic Collaboration',
            excerpt: 'Exploring new tools and technologies that are making research collaboration easier than ever.',
            author: 'Dr. Emily Martinez',
            date: '2025-04-25',
            readTime: '6 min read',
            tags: ['Collaboration', 'Technology', 'Future'],
            image: 'https://picsum.photos/800/402'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Assistant Blog</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Insights, updates, and best practices for researchers and academics
                    </p>
                </div>

                {/* Featured Post */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                    <div className="relative">
                        <img 
                            src={blogPosts[0].image} 
                            alt={blogPosts[0].title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center text-white/80 space-x-4 mb-4">
                                <span className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {blogPosts[0].date}
                                </span>
                                <span className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    {blogPosts[0].author}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {blogPosts[0].readTime}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {blogPosts[0].title}
                            </h2>
                            <p className="text-white/90 text-lg mb-4">
                                {blogPosts[0].excerpt}
                            </p>
                            <button className="text-white font-medium hover:text-blue-200 transition-colors flex items-center">
                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag, tagIndex) => (
                                        <span 
                                            key={tagIndex}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                        >
                                            <Tag className="h-3 w-3 mr-1" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                                    <span className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center">
                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Stay Updated with Research Assistant
                    </h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Subscribe to our newsletter for the latest research tips, product updates, and academic insights.
                    </p>
                    <form className="max-w-md mx-auto flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Blog;
