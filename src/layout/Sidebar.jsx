import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Home, Upload, FileText, BookOpen, Users, Settings, LogOut, X, Link } from 'lucide-react';
import { logout } from '../redux/slices/authSlice.js';
import axios from 'axios';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navItems = [
        { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard' },
        { name: 'Upload Paper', icon: <Upload className="h-5 w-5" />, path: '/upload' },
        { name: 'My Papers', icon: <FileText className="h-5 w-5" />, path: '/papers' },
        { name: 'Library', icon: <BookOpen className="h-5 w-5" />, path: '/library' },
        { name: 'Collaborators', icon: <Users className="h-5 w-5" />, path: '/collaborators' },
        { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
    ];

    const handleSignOut = async () => {
        try {
            // Call the backend logout endpoint to clear cookies
            await axios.post('/api/users/logout');

            // Clear local storage and session storage
            localStorage.removeItem('persist:root');
            sessionStorage.clear();

            // Dispatch Redux action
            dispatch(logout());

            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            {/* Desktop sidebar */}
            <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
                <div className="h-full w-64 bg-white border-r border-gray-200">
                    <div className="h-16 flex items-center px-6 border-b border-gray-200">
                        <NavLink to="/dashboard"><span className="text-2xl font-bold text-blue-600">RA</span> </NavLink>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <nav className="px-3 py-4">
                            <div className="space-y-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <div className="mr-3">{item.icon}</div>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </nav>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar - fixed position, slides in/out */}
            <div
                className={`lg:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}
            >
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                        <span className="text-2xl font-bold text-blue-600">RA</span>
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <nav className="px-3 py-4">
                            <div className="space-y-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        onClick={toggleSidebar}
                                        className={({ isActive }) =>
                                            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                            }`
                                        }
                                    >
                                        <div className="mr-3">{item.icon}</div>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </nav>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;