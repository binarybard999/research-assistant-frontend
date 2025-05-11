import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Building2, GraduationCap, Link2, Edit, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
    const { user } = useSelector(state => state.auth);

    // Function to truncate text if it's too long
    const truncate = (text, maxLength = 150) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header with Edit Button */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="mt-2 text-gray-600">
                            View and manage your academic profile
                        </p>
                    </div>
                    <Link 
                        to="/settings" 
                        className="inline-flex items-center px-4 py-2 mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                    </Link>
                </div>

                {/* Main Profile Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Banner and Profile Picture Section */}
                    <div className="relative">
                        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-500" />
                        <div className="absolute -bottom-16 left-6 md:left-10">
                            {user?.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    alt={user.name}
                                    className="h-32 w-32 rounded-full border-4 border-white shadow-md object-cover"
                                />
                            ) : (
                                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-md">
                                    <User className="h-16 w-16 text-blue-600" />
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-4 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <p className="text-white text-sm font-medium">{user?.title || 'Researcher'}</p>
                        </div>
                    </div>

                    {/* User Info Section */}
                    <div className="mt-16 px-6 md:px-10 pt-4 pb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mt-3">{user?.name || 'User Name'}</h2>
                        
                        {/* Basic Info Grid */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Mail className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-gray-900">{user?.email || 'Not provided'}</p>
                                    </div>
                                </div>
                                
                                {/* Institution */}
                                {user?.institution && (
                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <Building2 className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Institution</p>
                                            <p className="text-gray-900">{user.institution}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                {/* Bio */}
                                {user?.bio && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {truncate(user.bio, 300)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Research Interests */}
                        {user?.researchInterests?.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Research Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.researchInterests.map((interest, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 transition-all duration-200 hover:bg-blue-200"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {Object.values(user?.socialLinks || {}).some(link => link) && (
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-3">Connect</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(user?.socialLinks || {}).map(([platform, link]) => (
                                        link && (
                                            <a
                                                key={platform}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                                            >
                                                <div className="p-2 bg-blue-100 rounded-md group-hover:bg-blue-200 transition-colors">
                                                    <Link2 className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <span className="ml-2 text-gray-700 group-hover:text-blue-700 transition-colors">
                                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                </span>
                                                <ExternalLink className="h-3 w-3 ml-1 text-gray-400 group-hover:text-blue-500" />
                                            </a>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Publications Preview Section - Placeholder */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-medium text-gray-900">Recent Publications</h3>
                        <Link to="/publications" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                        </Link>
                    </div>
                    <div className="py-8 text-center text-gray-500">
                        <p>You haven't uploaded any publications yet.</p>
                        <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Upload Your First Paper
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;