import React from 'react';
import { Filter } from 'lucide-react';

const FilterDropdown = ({ filterOption, setFilterOption }) => {
    return (
        <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 pr-8 sm:text-sm border-gray-300 rounded-md appearance-none"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
            >
                <option value="all">All Papers</option>
                <option value="analyzed">Analyzed Papers</option>
                <option value="not-analyzed">Not Analyzed Papers</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
};

export default FilterDropdown;
