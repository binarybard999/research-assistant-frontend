import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../redux/slices/authSlice';

// Auth Pages
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import UserSettings from '../pages/UserSettings';
import UserProfilePage from '../pages/UserProfilePage';

// Layouts
import MainLayout from '../layout/MainLayout';
import Layout from '../components/HomeComponents/Layout';

// Pages
import Home from '../pages/Home';
import UploadPage from '../pages/UploadPage';
import DashboardPage from '../pages/DashboardPage';
import AllPapersPage from '../pages/AllPapersPage';
import PaperChatInterface from '../pages/PaperChatInterface';
import LibraryPage from '../pages/LibraryPage';

// Home Components Pages
import {
    About,
    Pricing,
    Documentation,
    Support,
    PrivacyPage,
    TermsOfService,
    Demo,
    Blog,
    APIDocumentation
} from '../components/HomeComponents/pages';
import { FeaturesSection } from '../components/HomeComponents';

// Auth Guard - Now uses Redux state instead of localStorage
const AuthGuard = ({ children }) => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        // Try to get current user if we're not sure about authentication status
        if (!isAuthenticated && !loading) {
            dispatch(getCurrentUser());
        }
    }, [isAuthenticated, loading, dispatch]);

    // Show loading state if we're checking authentication
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

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
            {/* Public routes with Layout */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="features" element={<FeaturesSection />} />
                <Route path="documentation" element={<Documentation />} />
                <Route path="support" element={<Support />} />
                <Route path="privacy-policy" element={<PrivacyPage />} />
                <Route path="terms-of-service" element={<TermsOfService />} />
                <Route path="demo" element={<Demo />} />
                <Route path="blog" element={<Blog />} />
                <Route path="api" element={<APIDocumentation />} />
            </Route>

            {/* Auth routes without Layout */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Protected routes with MainLayout */}
            <Route path="/" element={
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            }
            >
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="upload" element={<UploadPage />} />
                <Route path="papers" element={<AllPapersPage />} />
                <Route path="settings" element={<UserSettings />} />
                <Route path="profile" element={<UserProfilePage />} />
                <Route path="papers/:id/chat" element={<PaperChatInterface />} />
                <Route path="library" element={<LibraryPage />} />
                <Route path="collaborators" element={<div className="p-4 bg-white rounded-lg shadow">Collaborators Page (Coming Soon)</div>} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;