import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import LoginPage from '../components/auth/LoginPage';
import RegisterPage from '../components/auth/RegisterPage';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Pages
import Home from '../components/pages/Home';
import UploadPage from '../components/pages/UploadPage';
import DashboardPage from '../components/pages/DashboardPage';
import AllPapersPage from '../components/pages/AllPapersPage';
import PaperChatInterface from '../components/pages/PaperChatInterface';

// Auth Guard
const AuthGuard = ({ children }) => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('authToken');

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the protected route
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes with MainLayout */}
            <Route
                path="/"
                element={
                    <AuthGuard>
                        <MainLayout />
                    </AuthGuard>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/upload" element={<UploadPage />} />
                {/* More routes as needed */}
                <Route path="/papers" element={<AllPapersPage />} />

                <Route path="/papers/:id/chat" element={<PaperChatInterface />} />

                <Route path="/library" element={<div className="p-4 bg-white rounded-lg shadow">Library Page (Coming Soon)</div>} />
                <Route path="/collaborators" element={<div className="p-4 bg-white rounded-lg shadow">Collaborators Page (Coming Soon)</div>} />
                <Route path="/settings" element={<div className="p-4 bg-white rounded-lg shadow">Settings Page (Coming Soon)</div>} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;