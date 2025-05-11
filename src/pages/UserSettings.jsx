import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Save } from 'lucide-react';
import apiService from '../services/apiService.js';
import { loginSuccess } from '../redux/slices/authSlice.js';
import {
    ProfileSection,
    SocialLinksSection,
    ResearchInterestsSection,
    NotificationSection,
    ThemeSection,
    DisplaySection
} from '../components/UserSettingsComponents';

const UserSettings = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [settings, setSettings] = useState({
        theme: 'system',
        emailNotifications: {
            paperUploads: true,
            recommendations: true,
            paperSummaries: true
        },
        defaultChatOptions: {
            includeContext: true,
            followupQuestions: true
        },
        displayPreferences: {
            papersPerPage: 10,
            listView: false
        }
    });
    
    const [profile, setProfile] = useState({
        name: user?.name || '',
        bio: '',
        institution: '',
        title: '',
        profilePicture: user?.profilePicture || 'https://ui-avatars.com/api/?background=0D8ABC&color=fff',
        socialLinks: {
            googleScholar: '',
            researchGate: '',
            orcid: '',
            linkedin: ''
        },
        researchInterests: []
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const [settingsResponse, profileResponse] = await Promise.all([
                    apiService.get('/users/settings'),
                    apiService.get('/users/current-user')
                ]);

                if (settingsResponse.data?.data) {
                    setSettings(settingsResponse.data.data);
                }
                if (profileResponse.data?.data) {
                    const userData = profileResponse.data.data;
                    setProfile({
                        name: userData.name || '',
                        bio: userData.bio || '',
                        institution: userData.institution || '',
                        title: userData.title || '',
                        profilePicture: userData.profilePicture || 'https://ui-avatars.com/api/?background=0D8ABC&color=fff',
                        socialLinks: userData.socialLinks || {
                            googleScholar: '',
                            researchGate: '',
                            orcid: '',
                            linkedin: ''
                        },
                        researchInterests: userData.researchInterests || []
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleThemeChange = (theme) => {
        setSettings(prev => ({
            ...prev,
            theme
        }));
    };

    const handleNotificationChange = (setting) => {
        setSettings(prev => ({
            ...prev,
            emailNotifications: {
                ...prev.emailNotifications,
                [setting]: !prev.emailNotifications[setting]
            }
        }));
    };

    const handleChatOptionChange = (option) => {
        setSettings(prev => ({
            ...prev,
            defaultChatOptions: {
                ...prev.defaultChatOptions,
                [option]: !prev.defaultChatOptions[option]
            }
        }));
    };

    const handleDisplayPreferenceChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            displayPreferences: {
                ...prev.displayPreferences,
                [key]: value
            }
        }));
    };

    const handleProfileChange = (key, value) => {
        setProfile(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setProfile(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const handleResearchInterestChange = (interests) => {
        setProfile(prev => ({
            ...prev,
            researchInterests: interests.split(',').map(i => i.trim())
        }));
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            handleProfileChange('profilePicture', imageUrl);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('');
        try {
            const [settingsRes, profileRes] = await Promise.all([
                apiService.put('/users/settings', { settings }),
                apiService.put('/users/profile', profile)
            ]);

            // Update the auth state with new user data
            if (profileRes.data?.data) {
                dispatch(loginSuccess({ user: profileRes.data.data }));
            }

            setSaveStatus('Changes saved successfully');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error('Error saving changes:', error);
            setSaveStatus('Error saving changes');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your profile, preferences and application settings
                    </p>
                </div>

                <div className="space-y-6">
                    <ProfileSection
                        profile={profile}
                        handleProfileChange={handleProfileChange}
                        handleProfilePictureChange={handleProfilePictureChange}
                    />

                    <SocialLinksSection
                        socialLinks={profile.socialLinks}
                        handleSocialLinkChange={handleSocialLinkChange}
                    />

                    <ResearchInterestsSection
                        researchInterests={profile.researchInterests}
                        handleResearchInterestChange={handleResearchInterestChange}
                    />

                    <ThemeSection
                        theme={settings.theme}
                        handleThemeChange={handleThemeChange}
                    />

                    <NotificationSection
                        notifications={settings.emailNotifications}
                        handleNotificationChange={handleNotificationChange}
                    />

                    <DisplaySection
                        preferences={settings.displayPreferences}
                        handlePreferenceChange={handleDisplayPreferenceChange}
                    />
                </div>

                {/* Save Button */}
                <div className="sticky bottom-0 mt-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-end space-x-4">
                            {saveStatus && (
                                <div className={`flex items-center rounded-md px-4 py-2 text-sm ${
                                    saveStatus.includes('Error') 
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-green-100 text-green-700'
                                }`}>
                                    {saveStatus}
                                </div>
                            )}
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
                            >
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;
