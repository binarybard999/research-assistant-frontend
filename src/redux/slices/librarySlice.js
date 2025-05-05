import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService.js';

// Thunk actions
export const fetchLibrary = createAsyncThunk(
    'library/fetchLibrary',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/library');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch library');
        }
    }
);

export const fetchFavorites = createAsyncThunk(
    'library/fetchFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/library/favorites');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch favorites');
        }
    }
);

export const fetchTrendingPapers = createAsyncThunk(
    'library/fetchTrending',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/library/trending');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch trending papers');
        }
    }
);

export const fetchLibraryStats = createAsyncThunk(
    'library/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/library/stats');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch library stats');
        }
    }
);

export const toggleFavorite = createAsyncThunk(
    'library/toggleFavorite',
    async (paperId, { rejectWithValue }) => {
        try {
            const res = await apiService.patch(`/library/papers/${paperId}/favorite`);
            return { paperId, isFavorite: res.data.isFavorite };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to toggle favorite');
        }
    }
);

export const fetchPaperDetails = createAsyncThunk(
    'library/fetchPaperDetails',
    async (paperId, { rejectWithValue }) => {
        try {
            const res = await apiService.get(`/library/papers/${paperId}/details`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch paper details');
        }
    }
);

export const fetchRecommendations = createAsyncThunk(
    'library/fetchRecommendations',
    async (paperId, { rejectWithValue }) => {
        try {
            const res = await apiService.get(`/library/papers/${paperId}/recommendations`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch recommendations');
        }
    }
);

export const saveReadingSession = createAsyncThunk(
    'library/saveReadingSession',
    async (sessionData, { rejectWithValue }) => {
        try {
            const res = await apiService.post('/library/papers/reading-session', sessionData);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to save reading session');
        }
    }
);

export const bulkTagPapers = createAsyncThunk(
    'library/bulkTagPapers',
    async ({ paperIds, tags, operation }, { rejectWithValue }) => {
        try {
            const res = await apiService.post('/library/papers/tags', { paperIds, tags, operation });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to bulk tag papers');
        }
    }
);

export const exportCitations = createAsyncThunk(
    'library/exportCitations',
    async ({ paperIds, format }, { rejectWithValue }) => {
        try {
            const res = await apiService.post('/library/papers/citations', { paperIds, format });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to export citations');
        }
    }
);

// Slice
const librarySlice = createSlice({
    name: 'library',
    initialState: {
        all: [],
        favorites: [],
        trending: [],
        recommendations: [],
        currentPaper: null,
        stats: null,
        loading: false,
        error: null
    },
    reducers: {
        clearCurrentPaper(state) {
            state.currentPaper = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch library cases
            .addCase(fetchLibrary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLibrary.fulfilled, (state, action) => {
                state.loading = false;
                state.all = action.payload.papers || []; // Access papers array from response
                state.total = action.payload.total; // For pagination
            })
            .addCase(fetchLibrary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch favorites cases
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload.papers || action.payload || [];
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch trending papers cases
            .addCase(fetchTrendingPapers.fulfilled, (state, action) => {
                state.trending = action.payload;
            })

            // Fetch library stats cases
            .addCase(fetchLibraryStats.fulfilled, (state, action) => {
                state.stats = action.payload;
            })

            // Toggle favorite cases
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const { paperId, isFavorite } = action.payload;

                // Update main papers list
                const paperIndex = state.all.findIndex(p => p._id === paperId);
                if (paperIndex !== -1) {
                    if (!state.all[paperIndex].metadata) state.all[paperIndex].metadata = {};
                    state.all[paperIndex].metadata.isFavorite = isFavorite;
                }

                // Update favorites list
                if (isFavorite) {
                    if (!state.favorites.some(p => p._id === paperId)) {
                        const paper = state.all.find(p => p._id === paperId);
                        if (paper) state.favorites.push(paper);
                    }
                } else {
                    state.favorites = state.favorites.filter(p => p._id !== paperId);
                }
            })

            // Fetch paper details cases
            .addCase(fetchPaperDetails.fulfilled, (state, action) => {
                state.currentPaper = action.payload;
            })

            // Fetch recommendations cases
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.recommendations = action.payload;
            })

            // Save reading session cases
            .addCase(saveReadingSession.fulfilled, (state, action) => {
                // Update paper in all papers list if necessary
                if (action.payload.paper) {
                    const paperIndex = state.all.findIndex(p => p._id === action.payload.paper._id);
                    if (paperIndex !== -1) {
                        state.all[paperIndex] = action.payload.paper;
                    }
                }
            })

            // Bulk tag papers cases
            .addCase(bulkTagPapers.fulfilled, (state, action) => {
                // Update tags for the affected papers
                action.payload.updatedPapers.forEach(updatedPaper => {
                    const paperIndex = state.all.findIndex(p => p._id === updatedPaper._id);
                    if (paperIndex !== -1) {
                        state.all[paperIndex] = updatedPaper;
                    }

                    const favIndex = state.favorites.findIndex(p => p._id === updatedPaper._id);
                    if (favIndex !== -1) {
                        state.favorites[favIndex] = updatedPaper;
                    }
                });
            });
    }
});

export const { clearCurrentPaper } = librarySlice.actions;
export default librarySlice.reducer;