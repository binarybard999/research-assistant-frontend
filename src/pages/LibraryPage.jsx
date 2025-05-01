import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Star, Calendar, Clock, List, Loader2, Activity, BookOpen, Tag, Download, Filter, TrendingUp, PlusCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchLibrary,
    fetchFavorites,
    toggleFavorite,
    fetchTrendingPapers,
    fetchLibraryStats,
    bulkTagPapers
} from '../redux/slices/librarySlice';
import {
    fetchLists,
    createList,
    addToList
} from '../redux/slices/readingListSlice';
import { fetchActivity } from '../redux/slices/activitySlice';
import { ErrorBoundary } from '../components/ErrorBoundary';

const LibraryPage = () => {
    // Component state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('all');
    const [sortOption, setSortOption] = useState('newest');
    const [selectedPapers, setSelectedPapers] = useState([]);
    const [showAddToListModal, setShowAddToListModal] = useState(false);
    const [showCreateListModal, setShowCreateListModal] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [newListDescription, setNewListDescription] = useState('');
    const [selectedListId, setSelectedListId] = useState('');
    const [showTagModal, setShowTagModal] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // State for debounced search term

    // Redux hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get state from Redux store
    const {
        all: papers = [],
        favorites: rawFavorites = [],
        trending = [],
        stats,
        loading,
        error
    } = useSelector(state => state.library);
    const { lists } = useSelector(state => state.lists);
    const { feed: activities } = useSelector(state => state.activity);

    const favorites = Array.isArray(rawFavorites)
        ? rawFavorites
        : rawFavorites?.papers || [];

    // Fetch initial data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchLibrary());
                await dispatch(fetchFavorites());
                await dispatch(fetchLists());
                await dispatch(fetchActivity());
                await dispatch(fetchTrendingPapers());
                await dispatch(fetchLibraryStats());
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        // Only fetch if no data exists
        if (papers.length === 0 && lists.length === 0) {
            fetchData();
        }
    }, [dispatch]);

    // useEffect for debouncing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Filter and sort papers based on selection
    const getFilteredPapers = () => {
        // Start with papers or empty array
        let filtered = [...(papers || [])];

        // Apply filter
        if (filterOption === 'favorites') {
            filtered = filtered.filter(paper =>
                favorites.some(fav => fav._id === paper._id)
            );
        } else if (filterOption === 'trending') {
            filtered = trending;
        } else if (filterOption === 'recent-activity') {
            const recentPaperIds = activities
                .filter(activity => activity.paper)
                .map(activity => activity.paper)
                .slice(0, 10);
            filtered = filtered.filter(paper =>
                recentPaperIds.includes(paper._id)
            );
        }

        // Apply search
        if (debouncedSearchTerm) {
            filtered = filtered.filter(paper =>
                paper.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                (paper.abstract && paper.abstract.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
                (paper.authors && paper.authors.join(' ').toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
            );
        }

        // Apply sorting
        if (sortOption === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortOption === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortOption === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    };

    const filteredPapers = getFilteredPapers();

    // Event handlers
    const handleToggleFavorite = (paperId, e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(paperId));
    };

    const handlePaperSelect = (paperId) => {
        setSelectedPapers(prev => {
            if (prev.includes(paperId)) {
                return prev.filter(id => id !== paperId);
            } else {
                return [...prev, paperId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedPapers.length === filteredPapers.length) {
            setSelectedPapers([]);
        } else {
            setSelectedPapers(filteredPapers.map(paper => paper._id));
        }
    };

    const handleCreateList = () => {
        if (newListName.trim()) {
            dispatch(createList({
                name: newListName,
                description: newListDescription,
                isPublic: false
            })).then(() => {
                setNewListName('');
                setNewListDescription('');
                setShowCreateListModal(false);
            });
        }
    };

    const handleAddToList = () => {
        if (selectedListId && selectedPapers.length > 0) {
            // Send all paper IDs in a single request
            dispatch(addToList({
                listId: selectedListId,
                paperIds: selectedPapers
            })).then(() => {
                setShowAddToListModal(false);
                setSelectedPapers([]);
            });
        }
    };

    const handleApplyTags = () => {
        if (tagInput.trim() && selectedPapers.length > 0) {
            const tags = tagInput.split(',').map(tag => tag.trim());
            dispatch(bulkTagPapers({
                paperIds: selectedPapers,
                tags,
                operation: 'add'
            })).then(() => {
                setTagInput('');
                setShowTagModal(false);
                setSelectedPapers([]);
            });
        }
    };

    const isFavorite = (paperId) => {
        return Array.isArray(favorites)
            ? favorites.some(fav => fav?._id === paperId)
            : false;
    };

    if (loading && papers.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                <p className="ml-2 text-lg text-gray-600">Loading library...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header with stats */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-900">My Library</h1>

                    <div className="flex gap-4 text-sm">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-semibold">{papers?.length || 0}</span>
                            <span className="text-gray-500">Papers</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-semibold">{favorites.length}</span>
                            <span className="text-gray-500">Favorites</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-semibold">{lists.length}</span>
                            <span className="text-gray-500">Reading Lists</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-between items-center">
                    {/* Search bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search papers..."
                            className="pl-10 border px-3 py-2 rounded-md w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filter options */}
                    <div className="flex gap-2">
                        <select
                            value={filterOption}
                            onChange={(e) => setFilterOption(e.target.value)}
                            className="border px-3 py-2 rounded-md bg-white"
                        >
                            <option value="all">All Papers</option>
                            <option value="favorites">Favorites</option>
                            <option value="trending">Trending</option>
                            <option value="recent-activity">Recent Activity</option>
                        </select>

                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border px-3 py-2 rounded-md bg-white"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="title">Title A-Z</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bulk action toolbar - only visible when papers are selected */}
            {selectedPapers.length > 0 && (
                <div className="bg-blue-50 p-4 mb-6 rounded-lg flex justify-between items-center border border-blue-200">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedPapers.length === filteredPapers.length}
                            onChange={handleSelectAll}
                            className="mr-2"
                        />
                        <span>{selectedPapers.length} papers selected</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowTagModal(true)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50"
                        >
                            <Tag className="h-4 w-4" />
                            <span>Tag</span>
                        </button>
                        <button
                            onClick={() => setShowAddToListModal(true)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50"
                        >
                            <List className="h-4 w-4" />
                            <span>Add to List</span>
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Papers grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPapers.map(paper => (
                    <ErrorBoundary key={paper._id} fallback={<div>Error rendering paper</div>}>
                        <div
                            // key={paper._id}
                            className="bg-white shadow rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => navigate(`/library/${paper._id}`)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedPapers.includes(paper._id)}
                                        onChange={() => handlePaperSelect(paper._id)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mr-3"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">{paper.title}</h2>
                                        <p className="text-sm text-gray-500">{paper.authors || 'Unknown author'}</p>
                                    </div>
                                </div>
                                <button
                                    className="text-yellow-500 hover:text-yellow-600"
                                    onClick={(e) => handleToggleFavorite(paper._id, e)}
                                >
                                    <Star
                                        fill={isFavorite(paper._id) ? 'currentColor' : 'none'}
                                        className="h-5 w-5"
                                    />
                                </button>
                            </div>

                            <div className="flex items-center text-sm text-gray-500 mt-3 space-x-3">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(paper.createdAt).toLocaleDateString()}</span>
                                <Clock className="h-4 w-4" />
                                <span>~{Math.ceil((paper.wordCount || 1200) / 200)} min read</span>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-700 line-clamp-2">{paper.abstract || 'No abstract available.'}</p>
                            </div>

                            {paper.keywords && paper.keywords.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {paper.keywords.slice(0, 3).map((keyword, idx) => (
                                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                                            {keyword}
                                        </span>
                                    ))}
                                    {paper.keywords.length > 3 && (
                                        <span className="text-xs text-gray-500">+{paper.keywords.length - 3} more</span>
                                    )}
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/library/${paper._id}`);
                                    }}
                                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                                >
                                    <FileText className="h-4 w-4" /> View Paper
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPapers([paper._id]);
                                        setShowAddToListModal(true);
                                    }}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
                                >
                                    <List className="h-4 w-4" /> Save to List
                                </button>
                            </div>
                        </div>
                    </ErrorBoundary>
                ))}
            </div>

            {filteredPapers.length === 0 && (
                <div className="text-center text-gray-500 mt-12 p-10 bg-gray-50 rounded-lg">
                    <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No papers found</h3>
                    <p>Try adjusting your search or filter settings.</p>
                </div>
            )}

            {/* Recent Activity Section */}
            <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" /> Recent Activity
                </h2>
                <div className="bg-white shadow rounded-lg p-4">
                    {activities.length > 0 ? (
                        <ul className="divide-y">
                            {activities.slice(0, 5).map((activity, index) => (
                                <li key={index} className="py-3">
                                    <div className="flex items-start">
                                        <div className="p-2 bg-blue-50 rounded-full mr-3">
                                            {activity.action.includes('paper') ? (
                                                <FileText className="h-4 w-4 text-blue-600" />
                                            ) : activity.action.includes('reading_list') ? (
                                                <BookOpen className="h-4 w-4 text-blue-600" />
                                            ) : (
                                                <Activity className="h-4 w-4 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-800">
                                                {activity.action.replace(/_/g, ' ')}
                                                {activity.paper &&
                                                    <span className="font-medium"> - {
                                                        papers.find(p => p._id === activity.paper)?.title || 'a paper'
                                                    }</span>
                                                }
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(activity.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center py-4 text-gray-500">No recent activity recorded.</p>
                    )}
                </div>
            </div>

            {/* Reading Lists Section */}
            <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" /> My Reading Lists
                    </h2>
                    <button
                        onClick={() => setShowCreateListModal(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <PlusCircle className="h-4 w-4" />
                        <span>Create List</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lists.length > 0 ? (
                        lists.slice(0, 3).map(list => (
                            <div
                                key={list._id}
                                className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => navigate(`/reading-lists/${list._id}`)}
                            >
                                <h3 className="font-semibold">{list.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {list.papers?.length || 0} papers
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {list.description || 'No description'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="md:col-span-3 text-center py-6 bg-gray-50 rounded-lg">
                            <BookOpen className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                            <p className="text-gray-500">No reading lists created yet.</p>
                        </div>
                    )}
                    {lists.length > 3 && (
                        <div
                            className="flex justify-center items-center bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate('/reading-lists')}
                        >
                            <span className="text-blue-600">View all lists</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Add to List Modal */}
            {showAddToListModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-full">
                        <h3 className="text-lg font-semibold mb-4">Add to Reading List</h3>
                        {lists.length > 0 ? (
                            <>
                                <select
                                    value={selectedListId}
                                    onChange={(e) => setSelectedListId(e.target.value)}
                                    className="w-full border rounded p-2 mb-4"
                                >
                                    <option value="">Select a list...</option>
                                    {lists.map(list => (
                                        <option key={list._id} value={list._id}>{list.name}</option>
                                    ))}
                                </select>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => {
                                            setShowAddToListModal(false);
                                            setSelectedListId('');
                                        }}
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddToList}
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                        disabled={!selectedListId}
                                    >
                                        Add to List
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <p className="mb-4 text-center">You don't have any reading lists yet.</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => setShowAddToListModal(false)}
                                        className="px-4 py-2 border rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAddToListModal(false);
                                            setShowCreateListModal(true);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                    >
                                        Create a List
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Create List Modal */}
            {showCreateListModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-full">
                        <h3 className="text-lg font-semibold mb-4">Create New Reading List</h3>
                        <input
                            type="text"
                            placeholder="List name"
                            className="w-full border rounded p-2 mb-3"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <textarea
                            placeholder="Description (optional)"
                            className="w-full border rounded p-2 mb-4 h-24"
                            value={newListDescription}
                            onChange={(e) => setNewListDescription(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowCreateListModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateList}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                disabled={!newListName.trim()}
                            >
                                Create List
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tag Modal */}
            {showTagModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-full">
                        <h3 className="text-lg font-semibold mb-4">Add Tags to Selected Papers</h3>
                        <input
                            type="text"
                            placeholder="Enter tags (comma separated)"
                            className="w-full border rounded p-2 mb-4"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowTagModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApplyTags}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                disabled={!tagInput.trim()}
                            >
                                Apply Tags
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LibraryPage;