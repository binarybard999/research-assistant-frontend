import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Search, Bell, User, Settings, ChevronDown, LogOut } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const userName = useMemo(() => user?.name || '', [user?.name]);
    const userEmail = useMemo(() => user?.email || '', [user?.email]);
    const profilePicture = useMemo(() => user?.profilePicture || '', [user?.profilePicture]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleSignOut = async () => {
        try {
            await axios.post('/api/users/logout');
            localStorage.removeItem('persist:root');
            sessionStorage.clear();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white border-b border-gray-200 fixed lg:fixed w-full lg:w-auto lg:left-64 lg:right-0 z-10">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-600 lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
                            <span className="text-2xl font-bold text-blue-600 lg:hidden">RA</span>
                            <span className="hidden lg:block text-2xl font-bold text-blue-600">Research Assistant</span>
                        </Link>
                    </div>

                    <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xs">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                    placeholder="Search papers..."
                                    type="search"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                        </button>

                        {isAuthenticated && (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center space-x-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <div className="relative">
                                        {profilePicture ? (
                                            <img
                                                src={profilePicture}
                                                alt={userName}
                                                className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ring-2 ring-white">
                                                <span className="text-sm font-medium text-white">
                                                    {userName.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                                    </div>

                                    <div className="hidden md:flex flex-col items-start">
                                        <span className="text-sm font-medium text-gray-700">{userName}</span>
                                        <span className="text-xs text-gray-500 truncate max-w-[150px]">{userEmail}</span>
                                    </div>

                                    <ChevronDown className={`h-4 w-4 text-gray-500 hidden md:block transition-transform duration-200 ${userMenuOpen ? 'transform rotate-180' : ''}`} />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-60 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform transition-all duration-200 origin-top-right">
                                        <div className="py-1" role="menu">
                                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                                                <p className="text-sm font-medium text-gray-900">{userName}</p>
                                                <p className="text-xs text-gray-500 truncate mt-0.5">{userEmail}</p>
                                            </div>
                                            
                                            <Link
                                                to="/profile"
                                                className={`flex items-center px-4 py-2.5 text-sm ${isActive('/profile') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
                                                role="menuitem"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <User className="h-4 w-4 mr-3" />
                                                Your Profile
                                            </Link>

                                            <Link
                                                to="/settings"
                                                className={`flex items-center px-4 py-2.5 text-sm ${isActive('/settings') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
                                                role="menuitem"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <Settings className="h-4 w-4 mr-3" />
                                                Settings
                                            </Link>

                                            <div className="border-t border-gray-100 my-1"></div>

                                            <button
                                                onClick={handleSignOut}
                                                className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                                role="menuitem"
                                            >
                                                <LogOut className="h-4 w-4 mr-3" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;