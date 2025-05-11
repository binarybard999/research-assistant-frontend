import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Save, ChevronRight } from 'lucide-react';
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
    const [activeSection, setActiveSection] = useState(null);

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
        const cleanedInterests = interests
            .split(',')
            .map(i => i.trim())
            .filter(i => i !== '');
            
        setProfile(prev => ({
            ...prev,
            researchInterests: cleanedInterests
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

    // Setting sections for sidebar navigation
    const sections = [
        { id: 'profile', title: 'Profile Information', component: ProfileSection, props: { profile, handleProfileChange, handleProfilePictureChange } },
        { id: 'social', title: 'Social Links', component: SocialLinksSection, props: { socialLinks: profile.socialLinks, handleSocialLinkChange } },
        { id: 'research', title: 'Research Interests', component: ResearchInterestsSection, props: { researchInterests: profile.researchInterests, handleResearchInterestChange } },
        { id: 'theme', title: 'Theme', component: ThemeSection, props: { theme: settings.theme, handleThemeChange } },
        { id: 'notifications', title: 'Notifications', component: NotificationSection, props: { notifications: settings.emailNotifications, handleNotificationChange } },
        { id: 'display', title: 'Display Settings', component: DisplaySection, props: { preferences: settings.displayPreferences, handlePreferenceChange: handleDisplayPreferenceChange } }
    ];

    // Set default active section
    useEffect(() => {
        if (!activeSection && sections.length > 0) {
            setActiveSection(sections[0].id);
        }
    }, [sections]);

    // Get active component
    const activeComponent = sections.find(section => section.id === activeSection);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto pt-10 pb-20">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="mt-2 text-gray-600">
                            Manage your profile, preferences and application settings
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <nav className="flex flex-col">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`flex items-center justify-between px-4 py-3 text-left transition-colors ${
                                                activeSection === section.id
                                                    ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span>{section.title}</span>
                                            <ChevronRight 
                                                className={`h-4 w-4 transition-transform ${
                                                    activeSection === section.id ? 'transform rotate-90 text-blue-500' : 'text-gray-400'
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="space-y-6">
                                {activeComponent && React.createElement(
                                    activeComponent.component,
                                    activeComponent.props
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button - Fixed at Bottom */}
                <div className="fixed bottom-0 left-0 right-0 py-4 bg-white border-t border-gray-200 shadow-lg z-10">
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
                                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                            >
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
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
                                        <Save className="h-5 w-5 mr-2" />
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