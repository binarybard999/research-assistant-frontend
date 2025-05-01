import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FileText, Book, Users, Search, Bell, User, Settings, ChevronDown } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const Home = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Add event listener to close dropdown when clicking outside
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleSignOut = () => {
        dispatch(logout());
        navigate('/login');
        setUserMenuOpen(false);
    };

    const features = [
        {
            icon: <FileText className="h-8 w-8 text-blue-600" />,
            title: 'Upload Papers',
            description: 'Easily upload and analyze research papers in various formats including PDF, DOCX, and more.',
        },
        {
            icon: <Search className="h-8 w-8 text-blue-600" />,
            title: 'Smart Analysis',
            description: 'Get AI-powered summaries, key findings, and insights from your research papers.',
        },
        {
            icon: <Book className="h-8 w-8 text-blue-600" />,
            title: 'Research Library',
            description: 'Organize your papers in a personal library with custom tags and categories.',
        },
        {
            icon: <Users className="h-8 w-8 text-blue-600" />,
            title: 'Collaboration',
            description: 'Share papers with colleagues and collaborate on research projects.',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-blue-600 hidden sm:block">Research Assistant</span>
                            <span className="text-2xl font-bold text-blue-600 sm:hidden">RA</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {isAuthenticated ? (
                                <div className="flex items-center">
                                    <button className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2 sm:mr-3">
                                        <span className="sr-only">View notifications</span>
                                        <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </button>

                                    <div className="relative" ref={userMenuRef}>
                                        <button
                                            onClick={toggleUserMenu}
                                            className="flex items-center max-w-xs bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <span className="sr-only">Open user menu</span>
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            {user && (
                                                <div className="ml-2 flex items-center">
                                                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                                                        {user.name || user.email}
                                                    </span>
                                                    <ChevronDown className="h-4 w-4 ml-1 text-gray-500 hidden md:block" />
                                                </div>
                                            )}
                                        </button>

                                        {userMenuOpen && (
                                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                                <div className="py-1" role="menu">
                                                    <div className="px-4 py-2 border-b border-gray-100">
                                                        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                                                        <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                                                    </div>
                                                    <Link
                                                        to="/profile"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                    <Link
                                                        to="/settings"
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <Settings className="h-4 w-4 mr-2" />
                                                        Settings
                                                    </Link>
                                                    <button
                                                        onClick={handleSignOut}
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                        role="menuitem"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base">
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-white font-medium hover:bg-blue-700 transition text-sm sm:text-base"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Accelerate your Research
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
                        Upload research papers, get AI-powered summaries, and organize your knowledge in one place.
                    </p>
                    <div className="mt-10 flex justify-center">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 px-8 py-3 rounded-md text-white font-medium hover:bg-blue-700 transition text-lg"
                                >
                                    Start for free
                                </Link>
                                <Link
                                    to="/login"
                                    className="ml-4 px-8 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition text-lg"
                                >
                                    Learn more
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/dashboard"
                                className="bg-blue-600 px-8 py-3 rounded-md text-white font-medium hover:bg-blue-700 transition text-lg"
                            >
                                Go to Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Powerful features for researchers
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            Everything you need to manage and analyze your research papers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-center">{feature.icon}</div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                                <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Ready to get started?
                        </h2>
                        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                            Join thousands of researchers who are using Research Assistant to accelerate their work.
                        </p>
                        <div className="mt-8">
                            {!isAuthenticated ? (
                                <Link
                                    to="/register"
                                    className="bg-white px-8 py-3 rounded-md text-blue-600 font-medium hover:bg-gray-100 transition"
                                >
                                    Sign up now
                                </Link>
                            ) : (
                                <Link
                                    to="/dashboard"
                                    className="bg-white px-8 py-3 rounded-md text-blue-600 font-medium hover:bg-gray-100 transition"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-8 md:mb-0">
                            <span className="text-2xl font-bold">Research Assistant</span>
                            <p className="mt-2 text-gray-300">Making research easier for everyone.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Product</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">Testimonials</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">Guides</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">API</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Company</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                                    <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                        <p>&copy; {new Date().getFullYear()} Research Assistant. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;