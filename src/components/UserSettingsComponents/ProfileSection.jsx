import React from 'react';
import { Camera, User, Building2, GraduationCap, FileText } from 'lucide-react';

const ProfileSection = ({ profile, handleProfileChange, handleProfilePictureChange }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-5">
                <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                <p className="text-blue-100 text-sm mt-1">Manage your personal information</p>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Picture */}
                    <div className="col-span-1">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <div className="h-40 w-40 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-lg">
                                    <img
                                        src={profile.profilePicture}
                                        alt={profile.name}
                                        className="h-40 w-40 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <label
                                    htmlFor="profile-picture"
                                    className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-3 cursor-pointer hover:bg-blue-700 transition-colors duration-200 shadow-lg transform hover:scale-110"
                                >
                                    <Camera className="h-5 w-5 text-white" />
                                    <input
                                        type="file"
                                        id="profile-picture"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-gray-500 text-center font-medium">
                                Click the camera icon to update your photo
                            </p>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="col-span-2 space-y-6">
                        <div className="space-y-5">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => handleProfileChange('name', e.target.value)}
                                        className="pl-10 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 py-3"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <div className="relative rounded-lg shadow-sm">
                                    <FileText className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                                    <textarea
                                        value={profile.bio}
                                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                                        rows={4}
                                        className="pl-10 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 py-3"
                                        placeholder="Write a short bio about yourself..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Institution
                                    </label>
                                    <div className="relative rounded-lg shadow-sm">
                                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                                        <input
                                            type="text"
                                            value={profile.institution}
                                            onChange={(e) => handleProfileChange('institution', e.target.value)}
                                            className="pl-10 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 py-3"
                                            placeholder="Your institution"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <div className="relative rounded-lg shadow-sm">
                                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                                        <input
                                            type="text"
                                            value={profile.title}
                                            onChange={(e) => handleProfileChange('title', e.target.value)}
                                            className="pl-10 block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 py-3"
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