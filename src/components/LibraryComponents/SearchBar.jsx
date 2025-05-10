import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
                type="text"
                className="pl-10 border border-gray-300 px-4 py-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Search papers by title, author, or abstract..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
