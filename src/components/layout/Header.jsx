import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Search, Bell, User, Settings, ChevronDown } from 'lucide-react';
import { logout } from '../../redux/slices/authSlice';

const Header = ({ toggleSidebar }) => {
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

    return (
        <header className="bg-white border-b border-gray-200 fixed lg:fixed w-full lg:w-auto lg:left-64 lg:right-0 z-5">
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
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Search papers..."
                                    type="search"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" />
                        </button>

                        {isAuthenticated && (
                            <div className="ml-3 relative" ref={userMenuRef}>
                                <div>
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
                                </div>

                                {userMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;