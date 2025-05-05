import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Bookmark, TrendingUp, Clock } from 'lucide-react';

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
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search papers by title, author, or content..."
                        className="pl-10 border border-gray-300 px-4 py-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

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
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search papers..."
                        className="pl-10 border border-gray-300 px-3 py-2 rounded-lg w-full"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
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
    <div className="relative inline-block">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
        </div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);

const StatItem = ({ value, label, icon }) => (
    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
        <div className="text-gray-500">
            {icon}
        </div>
        <div>
            <span className="text-xl font-semibold block text-gray-900">{value}</span>
            <span className="text-xs text-gray-500">{label}</span>
        </div>
    </div>
);

// Icons
const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);