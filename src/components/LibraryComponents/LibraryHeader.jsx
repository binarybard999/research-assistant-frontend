import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Bookmark, FileText, Star, List } from 'lucide-react';
import { SearchBar } from './SearchBar';

const FileIcon = () => <FileText className="h-5 w-5 text-gray-400" />;
const StarIcon = () => <Star className="h-5 w-5 text-gray-400" />;
const ListIcon = () => <List className="h-5 w-5 text-gray-400" />;

export const LibraryHeader = ({
    papersCount,
    favoritesCount,
    listsCount,
    searchTerm,
    onSearchChange,
    filterOption,
    onFilterChange,
    sortOption,
    onSortChange
}) => {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 mb-6 relative">
            {/* Header Top */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0 flex items-center">
                    <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">
                        <Bookmark className="h-6 w-6" />
                    </span>
                    My Library
                </h1>

                <div className="flex flex-wrap gap-4 sm:gap-6">
                    <StatItem value={papersCount} label="Papers" icon={<FileIcon />} />
                    <StatItem value={favoritesCount} label="Favorites" icon={<StarIcon />} />
                    <StatItem value={listsCount} label="Lists" icon={<ListIcon />} />
                </div>
            </div>

            {/* Search and filters - Desktop */}
            <div className="hidden md:flex flex-wrap gap-4 justify-between items-center">
                <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

                <div className="flex gap-3">
                    <FilterSelect
                        value={filterOption}
                        onChange={onFilterChange}
                        options={[
                            { value: 'all', label: 'All Papers' },
                            { value: 'favorites', label: 'Favorites' },
                            { value: 'trending', label: 'Trending' },
                            { value: 'recent-activity', label: 'Recent Activity' }
                        ]}
                        icon={<Filter className="h-4 w-4" />}
                    />
                    <FilterSelect
                        value={sortOption}
                        onChange={onSortChange}
                        options={[
                            { value: 'newest', label: 'Newest First' },
                            { value: 'oldest', label: 'Oldest First' },
                            { value: 'title', label: 'Title A-Z' }
                        ]}
                        icon={<SlidersHorizontal className="h-4 w-4" />}
                    />
                </div>
            </div>

            {/* Search and Filters Toggle - Mobile */}
            <div className="md:hidden">
                <div className="mb-4">
                    <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
                </div>

                <button
                    className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 rounded-lg"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                >
                    <Filter className="h-4 w-4" />
                    <span>Filters & Sort</span>
                    <span className={`transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>

                {showMobileFilters && (
                    <div className="mt-3 space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter By</label>
                            <select
                                value={filterOption}
                                onChange={(e) => onFilterChange(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                            >
                                <option value="all">All Papers</option>
                                <option value="favorites">Favorites</option>
                                <option value="trending">Trending</option>
                                <option value="recent-activity">Recent Activity</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select
                                value={sortOption}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-lg w-full"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title">Title A-Z</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
     
const FilterSelect = ({ value, onChange, options, icon }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
        </div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none pl-10 pr-8 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </div>
    </div>
);

const StatItem = ({ value, label, icon }) => (
    <div className="flex items-center gap-2">
        <div className="bg-gray-100 p-2 rounded-lg">
            {icon}
        </div>
        <div>
            <div className="font-semibold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    </div>
);
