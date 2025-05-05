import React, { useState } from 'react';
import { X, List, FolderPlus, PlusCircle } from 'lucide-react';

export const AddToListModal = ({
    isOpen,
    lists,
    onClose,
    onCreateList,
    onSubmit
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <List className="h-5 w-5 text-blue-600" />
                        Add to Reading List
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {lists.length > 0 ? (
                    <ListSelectionForm lists={lists} onClose={onClose} onSubmit={onSubmit} onCreateNew={onCreateList} />
                ) : (
                    <EmptyListState onClose={onClose} onCreateList={onCreateList} />
                )}
            </div>
        </div>
    );
};

const ListSelectionForm = ({ lists, onClose, onSubmit, onCreateNew }) => {
    const [selectedListId, setSelectedListId] = useState('');

    return (
        <>
            <div className="mb-5">
                <label htmlFor="list-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Select a reading list
                </label>
                <select
                    id="list-select"
                    value={selectedListId}
                    onChange={(e) => setSelectedListId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                    <option value="">Select a list...</option>
                    {lists.map(list => (
                        <option key={list._id} value={list._id}>{list.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={onCreateNew}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <PlusCircle className="h-4 w-4" />
                    Create new list
                </button>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onSubmit(selectedListId)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                    disabled={!selectedListId}
                >
                    Add to List
                </button>
            </div>
        </>
    );
};

const EmptyListState = ({ onClose, onCreateList }) => (
    <div className="text-center px-4 py-6">
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <FolderPlus className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-1">No reading lists yet</p>
            <p className="text-sm text-gray-500 mb-4">Create your first reading list to organize your papers.</p>
        </div>

        <div className="flex justify-end gap-3">
            <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={onCreateList}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Create a List
            </button>
        </div>
    </div>
);