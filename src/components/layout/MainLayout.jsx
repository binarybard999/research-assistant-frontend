import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar when route changes (mobile only)
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    // Close sidebar when window is resized to larger size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                // On large screens, sidebar is always visible through CSS. This is just to ensure state is consistent
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="h-screen flex overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Content area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />

                <main className="flex-1 relative overflow-y-auto focus:outline-none pt-16">
                    <div className="h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 max-w-full overflow-x-hidden overflow-y-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Blur overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-white/5 backdrop-blur-sm lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
};

export default MainLayout;