import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService.js';

// Thunk actions
export const fetchLists = createAsyncThunk(
    'lists/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/reading-lists');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch reading lists');
        }
    }
);

export const fetchPublicLists = createAsyncThunk(
    'lists/fetchPublic',
    async (_, { rejectWithValue }) => {
        try {
            const res = await apiService.get('/reading-lists/public');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch public lists');
        }
    }
);

export const createList = createAsyncThunk(
    'lists/create',
    async (listData, { rejectWithValue }) => {
        try {
            const res = await apiService.post('/reading-lists', listData);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create list');
        }
    }
);

export const updateList = createAsyncThunk(
    'lists/update',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await apiService.put(`/reading-lists/${id}`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update list');
        }
    }
);

export const deleteList = createAsyncThunk(
    'lists/delete',
    async (id, { rejectWithValue }) => {
        try {
            await apiService.delete(`/reading-lists/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete list');
        }
    }
);

export const addToList = createAsyncThunk(
    'lists/add',
    async ({ listId, paperIds }, { rejectWithValue }) => { // Changed to paperIds
        try {
            const res = await apiService.post('/reading-lists/add', {
                listId,
                paperIds // Send array of IDs
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to add paper to list');
        }
    }
);

export const removeFromList = createAsyncThunk(
    'lists/remove',
    async ({ listId, paperId }, { rejectWithValue }) => {
        try {
            await apiService.delete(`/reading-lists/${listId}/papers/${paperId}`);
            return { listId, paperId };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to remove paper from list');
        }
    }
);

export const addCollaborator = createAsyncThunk(
    'lists/addCollaborator',
    async ({ listId, userId, role }, { rejectWithValue }) => {
        try {
            const res = await apiService.post('/reading-lists/collaborator', {
                listId,
                userId,
                role
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to add collaborator');
        }
    }
);

// Slice
const readingListSlice = createSlice({
    name: 'lists',
    initialState: {
        lists: [],
        publicLists: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch lists cases
            .addCase(fetchLists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.loading = false;
                state.lists = action.payload;
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch public lists cases
            .addCase(fetchPublicLists.fulfilled, (state, action) => {
                state.publicLists = action.payload;
            })

            // Create list cases
            .addCase(createList.fulfilled, (state, action) => {
                state.lists.push(action.payload);
            })

            // Update list cases
            .addCase(updateList.fulfilled, (state, action) => {
                const updatedList = action.payload;
                state.lists = state.lists.map(list =>
                    list._id === updatedList._id ? updatedList : list
                );
            })

            // Delete list cases
            .addCase(deleteList.fulfilled, (state, action) => {
                state.lists = state.lists.filter(list => list._id !== action.payload);
            })

            // Add to list cases
            .addCase(addToList.fulfilled, (state, action) => {
                const index = state.lists.findIndex(list => list._id === action.payload._id);
                if (index !== -1) {
                    state.lists[index] = action.payload;
                }
            })

            // Remove from list cases
            .addCase(removeFromList.fulfilled, (state, action) => {
                const { listId, paperId } = action.payload;
                const listIndex = state.lists.findIndex(list => list._id === listId);
                if (listIndex !== -1) {
                    state.lists[listIndex].papers = state.lists[listIndex].papers.filter(
                        paper => paper._id !== paperId
                    );
                }
            })

            // Add collaborator cases
            .addCase(addCollaborator.fulfilled, (state, action) => {
                const updatedList = action.payload;
                const index = state.lists.findIndex(l => l._id === updatedList._id);
                if (index !== -1) {
                    state.lists[index] = updatedList;
                }
                // Also update public lists if needed
                const publicIndex = state.publicLists.findIndex(l => l._id === updatedList._id);
                if (publicIndex !== -1) {
                    state.publicLists[publicIndex] = updatedList;
                }
            })
    }
});

export default readingListSlice.reducer;