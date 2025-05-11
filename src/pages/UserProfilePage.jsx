import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Building2, GraduationCap, Link2 } from 'lucide-react';

const UserProfilePage = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        View your profile information
                    </p>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-400">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {user?.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt={user.name}
                                        className="h-24 w-24 rounded-full border-4 border-white"
                                    />
                                ) : (
                                    <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white">
                                        <User className="h-12 w-12 text-blue-600" />
                                    </div>
                                )}
                            </div>
                            <div className="ml-6">
                                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                                <p className="text-blue-100">{user?.title}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <Mail className="h-5 w-5 mr-2" />
                                    Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {user?.email}
                                </dd>
                            </div>
                            
                            {user?.institution && (
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Building2 className="h-5 w-5 mr-2" />
                                        Institution
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {user.institution}
                                    </dd>
                                </div>
                            )}

                            {user?.bio && (
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {user.bio}
                                    </dd>
                                </div>
                            )}

                            {user?.researchInterests?.length > 0 && (
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Research Interests</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <div className="flex flex-wrap gap-2">
                                            {user.researchInterests.map((interest, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </dd>
                                </div>
                            )}

                            {Object.values(user?.socialLinks || {}).some(link => link) && (
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Link2 className="h-5 w-5 mr-2" />
                                        Social Links
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <div className="space-y-2">
                                            {Object.entries(user?.socialLinks || {}).map(([platform, link]) => (
                                                link && (
                                                    <a
                                                        key={platform}
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                                    >
                                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                                        <Link2 className="h-4 w-4 ml-1" />
                                                    </a>
                                                )
                                            ))}
                                        </div>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
