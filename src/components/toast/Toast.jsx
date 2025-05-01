import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';
import { removeToast } from '../../redux/slices/toastSlice';

const Toast = ({
    id,
    message,
    type = 'info',
    duration = 5000,
    position = 'bottom-right'
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // No need for timeout here as it's handled in the thunk
        // This just handles the animation part
        if (!isVisible) {
            const timer = setTimeout(() => {
                dispatch(removeToast(id));
            }, 300); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [isVisible, dispatch, id]);

    const handleClose = () => {
        setIsVisible(false);
    };

    // Map type to icon and colors
    const toastConfig = {
        success: {
            icon: <CheckCircle className="h-5 w-5" />,
            bgColor: 'bg-green-50',
            textColor: 'text-green-800',
            borderColor: 'border-green-300',
            iconColor: 'text-green-500'
        },
        error: {
            icon: <AlertCircle className="h-5 w-5" />,
            bgColor: 'bg-red-50',
            textColor: 'text-red-800',
            borderColor: 'border-red-300',
            iconColor: 'text-red-500'
        },
        info: {
            icon: <Info className="h-5 w-5" />,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-800',
            borderColor: 'border-blue-300',
            iconColor: 'text-blue-500'
        },
        warning: {
            icon: <AlertTriangle className="h-5 w-5" />,
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-800',
            borderColor: 'border-yellow-300',
            iconColor: 'text-yellow-500'
        },
        loading: {
            icon: <Loader2 className="h-5 w-5 animate-spin" />,
            bgColor: 'bg-gray-50',
            textColor: 'text-gray-800',
            borderColor: 'border-gray-300',
            iconColor: 'text-gray-500'
        }
    };

    const config = toastConfig[type] || toastConfig.info;

    // Position classes
    const positionClasses = {
        'top-left': 'top-4 left-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4'
    };

    return (
        <div
            className={`fixed ${positionClasses[position]} z-50 transition-all duration-300 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
        >
            <div className={`flex items-center p-4 max-w-md rounded-lg shadow-lg border ${config.bgColor} ${config.borderColor}`}>
                <div className={`flex-shrink-0 ${config.iconColor}`}>
                    {config.icon}
                </div>
                <div className={`ml-3 mr-4 ${config.textColor}`}>
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={handleClose}
                    className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 focus:ring-2 focus:ring-gray-300 ${config.textColor} hover:bg-gray-100`}
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;