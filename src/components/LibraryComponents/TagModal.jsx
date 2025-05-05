import React, { useState } from 'react';
import { X, Tag, Plus } from 'lucide-react';

export const TagModal = ({
    isOpen,
    tagInput,
    onClose,
    onChange,
    onSubmit
}) => {
    const [suggestedTags] = useState(['Research', 'ML', 'NLP', 'Important', 'Review', 'AI']);

    if (!isOpen) return null;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            onSubmit(tagInput);
        }
    };

    const addSuggestedTag = (tag) => {
        const currentTags = tagInput.split(',').map(t => t.trim()).filter(t => t);
        if (!currentTags.includes(tag)) {
            const newTagInput = currentTags.length > 0
                ? `${tagInput.trim()}, ${tag}`
                : tag;
            onChange(newTagInput);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Tag className="h-5 w-5 text-blue-600" />
                        Add Tags to Selected Papers
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="mb-5">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter tags (comma separated)
                    </label>
                    <div className="relative">
                        <input
                            id="tags"
                            type="text"
                            placeholder="e.g. Research, Important, Review"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={tagInput}
                            onChange={(e) => onChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Tag className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {suggestedTags.length > 0 && (
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Suggested tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {suggestedTags.map((tag, index) => (
                                <button
                                    key={index}
                                    onClick={() => addSuggestedTag(tag)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(tagInput)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                        disabled={!tagInput.trim()}
                    >
                        Apply Tags
                    </button>
                </div>
            </div>
        </div>
    );
};