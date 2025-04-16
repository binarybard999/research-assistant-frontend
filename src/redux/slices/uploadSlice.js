import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/apiService.js';

// Async thunk for uploading papers
export const uploadPaper = createAsyncThunk(
    'upload/uploadPaper',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await apiService.post('/papers/batch-upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    dispatch(setUploadProgress(percentCompleted)); // properly dispatch progress
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Upload failed');
        }
    }
);

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        papers: [],
        loading: false,
        error: null,
        progress: 0,
        remainingUploads: null,
        tierLimits: null
    },
    reducers: {
        resetUploadState: (state) => {
            state.papers = [];
            state.error = null;
            state.progress = 0;
        },
        setUploadProgress: (state, action) => {
            state.progress = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadPaper.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.progress = 0;
            })
            .addCase(uploadPaper.fulfilled, (state, action) => {
                state.loading = false;
                state.papers = action.payload.papers || [];
                state.remainingUploads = action.payload.limits?.remaining;
                state.tierLimits = action.payload.limits;
            })
            .addCase(uploadPaper.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Upload failed';
                state.remainingUploads = action.payload?.limits?.remaining;
                state.tierLimits = action.payload?.limits;

                if (action.payload?.rejectedFiles) {
                    state.papers = action.payload.rejectedFiles.map(file => ({
                        error: true,
                        name: file.filename,
                        message: file.error
                    }));
                }
            });
    }
});

export const { resetUploadState, setUploadProgress } = uploadSlice.actions;
export default uploadSlice.reducer;
