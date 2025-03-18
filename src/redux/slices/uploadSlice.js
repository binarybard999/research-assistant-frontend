import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService.js';

// Async thunk for uploading paper
export const uploadPaper = createAsyncThunk(
    'upload/uploadPaper',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/api/v1/papers/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        paper: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadPaper.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadPaper.fulfilled, (state, action) => {
                state.loading = false;
                state.paper = action.payload;
            })
            .addCase(uploadPaper.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Upload failed';
            });
    },
});

export default uploadSlice.reducer;
