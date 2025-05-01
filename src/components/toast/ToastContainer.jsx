import React from 'react';
import { useSelector } from 'react-redux';
import { selectToasts } from '../../redux/slices/toastSlice';
import Toast from './Toast';

const ToastContainer = () => {
    const toasts = useSelector(selectToasts);

    // Group toasts by position
    const toastsByPosition = toasts.reduce((acc, toast) => {
        const position = toast.position || 'bottom-right';
        if (!acc[position]) {
            acc[position] = [];
        }
        acc[position].push(toast);
        return acc;
    }, {});

    return (
        <>
            {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
                <div key={position} className={`fixed z-50 ${getPositionClass(position)} flex flex-col gap-2`}>
                    {positionToasts.map(toast => (
                        <Toast
                            key={toast.id}
                            id={toast.id}
                            message={toast.message}
                            type={toast.type}
                            duration={toast.duration}
                            position={position}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};

// Helper function to get position class
const getPositionClass = (position) => {
    switch (position) {
        case 'top-left': return 'top-4 left-4';
        case 'top-center': return 'top-4 left-1/2 transform -translate-x-1/2';
        case 'top-right': return 'top-4 right-4';
        case 'bottom-left': return 'bottom-4 left-4';
        case 'bottom-center': return 'bottom-4 left-1/2 transform -translate-x-1/2';
        case 'bottom-right':
        default: return 'bottom-4 right-4';
    }
};

export default ToastContainer;