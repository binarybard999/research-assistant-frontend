import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './slices/uploadSlice.js';
import authReducer from './slices/authSlice.js';
import toastReducer from './slices/toastSlice.js';

const store = configureStore({
    reducer: {
        upload: uploadReducer,
        auth: authReducer,
        toast: toastReducer,
    },
});

export default store;