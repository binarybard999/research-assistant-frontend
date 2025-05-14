import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage

import uploadReducer from './slices/uploadSlice.js';
import authReducer from './slices/authSlice.js';
import toastReducer from './slices/toastSlice.js';
import libraryReducer from './slices/librarySlice.js';
import readingListReducer from './slices/readingListSlice.js';
import activityReducer from './slices/activitySlice.js';
import themeReducer from './slices/themeSlice.js';

// Persist config for auth slice
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'accessToken', 'refreshToken', 'isAuthenticated'], // Only persist necessary fields
};

// Persist config for library
const libraryPersistConfig = {
    key: 'library',
    storage,
    whitelist: ['favorites'], // Only persist favorites
};

// Root reducer with persistence configuration
const rootReducer = combineReducers({
    upload: uploadReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    toast: toastReducer,
    library: persistReducer(libraryPersistConfig, libraryReducer),
    lists: readingListReducer,
    activity: activityReducer,
    theme: themeReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['payload.headers', 'payload.config', 'payload.request'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;