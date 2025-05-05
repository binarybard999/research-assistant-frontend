import React from 'react';
import { FileText, Search, Filter } from 'lucide-react';

export const EmptyState = ({ visible, searchTerm, filterOption }) => {
    if (!visible) return null;

    // Different messages based on search or filter context
    const isSearching = searchTerm && searchTerm.length > 0;
    const isFiltering = filterOption !== 'all';

    return (
        <div className="text-center py-16 px-6 my-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            {isSearching ? (
                <>
                    <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching papers found</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        We couldn't find any papers matching "{searchTerm}". Try different keywords or check your spelling.
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Clear search
                    </button>
                </>
            ) : isFiltering ? (
                <>
                    <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Filter className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No papers match your filter</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {filterOption === 'favorites'
                            ? "You haven't favorited any papers yet."
                            : filterOption === 'trending'
                                ? "There are no trending papers at the moment."
                                : "No papers match the current filter."}
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Reset filters
                    </button>
                </>
            ) : (
                <>
                    <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Your library is empty</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Add papers to your library to keep track of your research.
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Upload a Paper
                    </button>
                </>
            )}
        </div>
    );
};
