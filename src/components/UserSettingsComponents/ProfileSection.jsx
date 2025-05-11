import React from 'react';
import { Camera, User, Building2, GraduationCap } from 'lucide-react';

const ProfileSection = ({ profile, handleProfileChange, handleProfilePictureChange }) => {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
                <h2 className="text-lg font-medium text-white">Profile Information</h2>
                <p className="text-blue-100 text-sm mt-1">Manage your personal information</p>
            </div>
            
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Picture */}
                    <div className="col-span-1">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full overflow-hidden ring-4 ring-blue-100">
                                    <img
                                        src={profile.profilePicture}
                                        alt={profile.name}
                                        className="h-32 w-32 object-cover transition-transform duration-200 group-hover:scale-110"
                                    />
                                </div>
                                <label
                                    htmlFor="profile-picture"
                                    className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors duration-200 shadow-lg transform hover:scale-105"
                                >
                                    <Camera className="h-4 w-4 text-white" />
                                    <input
                                        type="file"
                                        id="profile-picture"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                Click the camera icon to update your photo
                            </p>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="col-span-2 space-y-4">
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => handleProfileChange('name', e.target.value)}
                                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Bio
                                </label>
                                <textarea
                                    value={profile.bio}
                                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                                    rows={3}
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    placeholder="Write a short bio about yourself..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Institution
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={profile.institution}
                                            onChange={(e) => handleProfileChange('institution', e.target.value)}
                                            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                            placeholder="Your institution"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={profile.title}
                                            onChange={(e) => handleProfileChange('title', e.target.value)}
                                            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                            placeholder="Your title"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
