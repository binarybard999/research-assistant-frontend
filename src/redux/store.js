import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import uploadReducer from './slices/uploadSlice.js';
import authReducer from './slices/authSlice.js';
import toastReducer from './slices/toastSlice.js';

// Persist config for auth slice
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'accessToken', 'refreshToken', 'isAuthenticated'], // Only persist necessary fields
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
    reducer: {
        upload: uploadReducer,
        auth: persistedAuthReducer,
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required to prevent redux-persist warnings
        }),
});

export const persistor = persistStore(store);
export default store;
