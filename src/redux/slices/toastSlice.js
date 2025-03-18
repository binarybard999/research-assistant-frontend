import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: []
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action) => {
            const newToast = {
                id: Date.now().toString(),
                ...action.payload
            };
            state.toasts.push(newToast);
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
        }
    }
});

// Actions
export const { addToast, removeToast } = toastSlice.actions;

// Toast type helper actions
export const showToast = (message, type = 'info', options = {}) => (dispatch) => {
    const id = Date.now().toString();
    dispatch(addToast({
        id,
        message,
        type,
        duration: options.duration || 5000,
        position: options.position || 'bottom-right'
    }));

    // Auto-dismiss toast after duration (if not infinite)
    if ((options.duration || 5000) !== Infinity) {
        setTimeout(() => {
            dispatch(removeToast(id));
        }, options.duration || 5000);
    }

    return id;
};

export const showSuccess = (message, options) => showToast(message, 'success', options);
export const showError = (message, options) => showToast(message, 'error', options);
export const showInfo = (message, options) => showToast(message, 'info', options);
export const showWarning = (message, options) => showToast(message, 'warning', options);
export const showLoading = (message, options) =>
    showToast(message, 'loading', { duration: Infinity, ...options });

// Selectors
export const selectToasts = state => state.toast.toasts;

export default toastSlice.reducer;