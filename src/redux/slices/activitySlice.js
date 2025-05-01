import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService.js';

// Thunk actions
export const fetchActivity = createAsyncThunk(
    'activity/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/activity');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch activity');
        }
    }
);

export const fetchActivityStats = createAsyncThunk(
    'activity/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/activity/stats');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch activity stats');
        }
    }
);

export const clearActivity = createAsyncThunk(
    'activity/clear',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.delete('/activity');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to clear activity');
        }
    }
);

// Slice
const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        feed: [],
        stats: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch activity cases
            .addCase(fetchActivity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActivity.fulfilled, (state, action) => {
                state.loading = false;
                state.feed = action.payload;
            })
            .addCase(fetchActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch stats cases
            .addCase(fetchActivityStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchActivityStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchActivityStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Clear activity cases
            .addCase(clearActivity.fulfilled, (state) => {
                state.feed = [];
            });
    }
});

export default activitySlice.reducer;