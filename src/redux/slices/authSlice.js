import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService.js';

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/api/v1/users/login', credentials);
            // Save the token to localStorage
            localStorage.setItem('authToken', response.data.token);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/api/v1/users/register', userData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            // Remove token from localStorage
            localStorage.removeItem('authToken');
            return null;
        } catch (err) {
            return rejectWithValue('Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('authToken') || null,
        loading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem('authToken'),
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // Add loginSuccess action for direct login handling
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            // Also save to localStorage for persistence
            localStorage.setItem('authToken', action.payload.token);
        },
        // Add logout action for direct logout handling
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            // Remove from localStorage
            localStorage.removeItem('authToken');
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Registration cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                // We don't authenticate the user after registration
                // They need to login separately
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout cases
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    },
});

export const { clearError, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;