import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { registerUser } from '../../redux/slices/authSlice.js';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const password = watch('password', '');

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError(null);

        try {
            const resultAction = await dispatch(registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
            }));

            if (registerUser.fulfilled.match(resultAction)) {
                navigate('/login', {
                    state: {
                        message: 'Registration successful! Please log in with your new account.'
                    }
                });
            } else {
                setApiError(resultAction.payload || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);

            // Handle error responses from the API
            if (error.response) {
                // Check if the error is due to email already existing
                if (error.response.status === 409) {
                    setApiError('This email is already registered. Please use a different email or try logging in.');
                } else {
                    setApiError(error.response.data.message || 'Registration failed. Please try again.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                setApiError('No response from server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setApiError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join Research Assistant today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                type="text"
                                className={`pl-10 block w-full rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'
                                    } py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                                {...register('name', {
                                    required: 'Full name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Name must be at least 2 characters'
                                    }
                                })}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                className={`pl-10 block w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'
                                    } py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className={`pl-10 block w-full rounded-md border ${errors.password ? 'border-red-300' : 'border-gray-300'
                                    } py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                                    }
                                })}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                className={`pl-10 block w-full rounded-md border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    } py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: value => value === password || 'Passwords do not match'
                                })}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            {...register('terms', {
                                required: 'You must accept the terms and conditions'
                            })}
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            I agree to the{' '}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 mt-4"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </div>

                    {/* Display API errors if they exist */}
                    {apiError && (
                        <div className="py-2 px-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
                            {apiError}
                        </div>
                    )}
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;