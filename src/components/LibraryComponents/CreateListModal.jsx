import React from 'react';
import { X, ListPlus } from 'lucide-react';

export const CreateListModal = ({
    isOpen,
    listData,
    onClose,
    onChange,
    onSubmit
}) => {
    if (!isOpen) return null;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey && listData.name.trim()) {
            onSubmit();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <ListPlus className="h-5 w-5 text-blue-600" />
                        Create New Reading List
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="mb-4">
                    <label htmlFor="list-name" className="block text-sm font-medium text-gray-700 mb-1">
                        List name *
                    </label>
                    <input
                        id="list-name"
                        type="text"
                        placeholder="e.g. Machine Learning Papers"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={listData.name}
                        onChange={(e) => onChange({ ...listData, name: e.target.value })}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="list-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description (optional)
                    </label>
                    <textarea
                        id="list-description"
                        placeholder="What is this list about?"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                        value={listData.description}
                        onChange={(e) => onChange({ ...listData, description: e.target.value })}
                        rows="3"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                        disabled={!listData.name.trim()}
                    >
                        Create List
                    </button>
                </div>
            </div>
        </div>
    );
};
