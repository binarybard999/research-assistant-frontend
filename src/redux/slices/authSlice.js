import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService.js";

// Async thunk for user login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiService.post(
                "/api/v1/users/login",
                credentials,
                {
                    withCredentials: true, // Important for receiving cookies
                }
            );

            return response.data.data; // Updated to match the new response structure
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiService.post(
                "/api/v1/users/register",
                userData,
                {
                    withCredentials: true, // Important for receiving cookies
                }
            );

            return response.data.data; // Updated to match the new response structure
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Registration failed"
            );
        }
    }
);

// Async thunk for refreshing token
export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.post(
                "/api/v1/users/refresh-token",
                {},
                {
                    withCredentials: true, // Important for sending cookies
                }
            );

            return response.data.data; // Updated to match the new response structure
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Token refresh failed"
            );
        }
    }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await apiService.post(
                "/api/v1/users/logout",
                {},
                {
                    withCredentials: true, // Important for sending cookies
                }
            );

            return null;
        } catch (err) {
            return rejectWithValue("Logout failed");
        }
    }
);

// Async thunk for getting current user
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get("/api/v1/users/current-user", {
                withCredentials: true, // Important for sending cookies
            });

            return response.data.data; // Updated to match the new response structure
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to get user"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        // Add loginSuccess action for direct login handling
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        // Update tokens when they're refreshed
        updateTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        // Add logout action for direct logout handling
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },
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
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
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
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Current user cases
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload || "Failed to get user";
            })

            // Refresh token cases
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.refreshToken = null;
                if (action.payload === "Token expired") {
                    state.user = null;
                }
            })

            // Logout cases
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                state.error = null;  // Clear errors on logout
            });

    },
});

export const { clearError, loginSuccess, logout, updateTokens } =
    authSlice.actions;
export default authSlice.reducer;
