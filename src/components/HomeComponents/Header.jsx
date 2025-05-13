import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Bell, ChevronDown, User, Settings, LogOut, X } from 'lucide-react';
import { logout } from '../../redux/slices/authSlice';
import axios from 'axios';

const Header = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            // Call the backend logout endpoint to clear cookies
            await axios.post('/api/users/logout');

            // Clear local storage and session storage
            localStorage.removeItem('persist:root');
            sessionStorage.clear();

            // Dispatch Redux action
            dispatch(logout());

            // Navigate to login
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Navigation - Desktop */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-blue-600">Research<span className="text-gray-800">Assistant</span></span>
                        </Link>
                        <div className="hidden md:ml-8 md:flex md:space-x-8">
                            <Link to="/features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Features</Link>
                            <Link to="/pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Pricing</Link>
                            <Link to="/documentation" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Documentation</Link>
                            <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</Link>
                        </div>
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
                                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <span className="sr-only">View notifications</span>
                                    <Bell className="h-6 w-6" />
                                </button>

                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <User className="h-5 w-5 text-blue-600" />
                                        </div>
                                        {user && (
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {user.name || user.email}
                                                </span>
                                                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                                            </div>
                                        )}
                                    </button>

                                    {userMenuOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                                            <div className="py-1">
                                                <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                                                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <User className="h-4 w-4 mr-3 text-blue-500" />
                                                    Your Profile
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <Settings className="h-4 w-4 mr-3 text-blue-500" />
                                                    Settings
                                                </Link>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <LogOut className="h-4 w-4 mr-3" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 px-5 py-2 rounded-lg text-white font-medium hover:bg-blue-700 transition shadow-md"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Features</Link>
                        <Link to="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Pricing</Link>
                        <Link to="/documentation" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Documentation</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</Link>
                    </div>

                    {isAuthenticated ? (
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{user?.name || 'User'}</div>
                                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                </div>
                                <button className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <Bell className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <Link
                                    to="/dashboard"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 pb-3 border-t border-gray-200 px-5">
                            <Link to="/login" 
                                className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 mb-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="block w-full text-center px-4 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
