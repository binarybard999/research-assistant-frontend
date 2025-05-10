import React from 'react';
import { FileText, Star, Calendar, Clock, List, Users } from 'lucide-react';

export const PaperCard = ({
    paper,
    isSelected,
    isFavorite,
    onSelect,
    onToggleFavorite,
    onAddToList,
    onViewDetails
}) => {
    const readingTime = Math.ceil((paper.wordCount || 1200) / 200);

    return (
        <div
            className="bg-white shadow hover:shadow-md rounded-lg overflow-hidden transition-all duration-300 border border-gray-100 hover:border-blue-100 h-full flex flex-col"
            onClick={() => onViewDetails(paper)}
        >
            {/* Card Top - Colored Banner */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

            {/* Card Header */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                        <label className="relative inline-flex mr-3" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => onSelect(paper._id)}
                                className="sr-only peer"
                            />
                            <span className="w-5 h-5 border border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors flex items-center justify-center">
                                {isSelected && <span className="text-white text-xs">✓</span>}
                            </span>
                        </label>
                        <div className="overflow-hidden">
                            <h2 className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                                {paper.title}
                            </h2>
                        </div>
                    </div>
                    <button
                        className={`text-yellow-500 hover:text-yellow-600 ml-2 flex-shrink-0 focus:outline-none`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite();
                        }}
                    >
                        <Star
                            fill={isFavorite ? 'currentColor' : 'none'}
                            className="h-5 w-5 transition-transform hover:scale-110"
                        />
                    </button>
                </div>

                {/* Authors */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Users className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <p className="truncate">{paper.authors || 'Unknown author'}</p>
                </div>
            </div>

            {/* Card Content */}
            <div className="px-5 pb-3 flex-grow">
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-3">
                    {paper.abstract || 'No abstract available.'}
                </p>

                {paper.keywords?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 mb-3">
                        {paper.keywords.slice(0, 3).map((keyword, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                                {keyword}
                            </span>
                        ))}
                        {paper.keywords.length > 3 && (
                            <span className="text-xs text-gray-500 flex items-center">
                                <span className="whitespace-nowrap">+{paper.keywords.length - 3}</span>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Card Footer */}
            <div className="px-5 py-3 mt-auto border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {new Date(paper.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            ~{readingTime} min
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToList();
                        }}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <List className="h-3.5 w-3.5" /> Save
                    </button>
                </div>
            </div>
        </div>
    );
};