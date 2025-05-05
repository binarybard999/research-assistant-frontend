import React from 'react';
import { Tag, List, CheckCircle, Trash2 } from 'lucide-react';

export const BulkActionsToolbar = ({
    selectedCount,
    totalCount,
    onSelectAll,
    onTagClick,
    onAddToListClick,
    onDelete
}) => {
    if (selectedCount === 0) return null;

    return (
        <div className="bg-blue-50 py-3 px-5 mb-6 rounded-lg flex justify-between items-center border border-blue-200 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedCount === totalCount}
                            onChange={onSelectAll}
                            className="sr-only peer"
                        />
                        <span className="w-5 h-5 border border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors flex items-center justify-center">
                            {selectedCount === totalCount && <CheckCircle className="h-4 w-4 text-white" />}
                        </span>
                    </label>
                </div>
                <span className="text-blue-800 font-medium">
                    {selectedCount} {selectedCount === 1 ? 'paper' : 'papers'} selected
                </span>
            </div>
            <div className="flex gap-2">
                <ActionButton icon={Tag} label="Add Tags" onClick={onTagClick} />
                <ActionButton icon={List} label="Add to List" onClick={onAddToListClick} />
                {onDelete && (
                    <ActionButton
                        icon={Trash2}
                        label="Delete"
                        onClick={onDelete}
                        className="text-red-600 hover:text-red-700 bg-white border-red-200 hover:bg-red-50"
                    />
                )}
            </div>
        </div>
    );
};

const ActionButton = ({ icon: Icon, label, onClick, className = "" }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
    >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
    </button>
);