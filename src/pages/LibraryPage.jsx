// LibraryPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    FileText, Search, Star, Calendar, Clock, List, Loader2, Activity, BookOpen, Tag, Download, Filter, TrendingUp, PlusCircle
} from 'lucide-react';
import { fetchLists, createList, addToList } from '../redux/slices/readingListSlice';
import { fetchActivity } from '../redux/slices/activitySlice';
import {
    LibraryHeader,
    PaperCard,
    PaperDetailsModal,
    ReadingListsSection,
    ActivityFeed,
    AddToListModal,
    CreateListModal,
    TagModal,
    BulkActionsToolbar,
    EmptyState
} from '../components/LibraryComponents';
import { ErrorBoundary } from '../components/ErrorBoundary';

const LibraryPage = () => {
    // State management
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('all');
    const [sortOption, setSortOption] = useState('newest');
    const [selectedPapers, setSelectedPapers] = useState([]);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [modalState, setModalState] = useState({
        addToList: false,
        createList: false,
        tag: false
    });
    const [listData, setListData] = useState({ name: '', description: '' });
    const [tagInput, setTagInput] = useState('');

    // Redux hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        all: papers = [],
        favorites: rawFavorites = [],
        trending = [],
        stats,
        loading,
        error
    } = useSelector(state => state.library);
    const { lists } = useSelector(state => state.lists);    const { feed: activities } = useSelector(state => state.activity);

    // Derived state
    const favorites = Array.isArray(rawFavorites) ? rawFavorites : rawFavorites?.papers || [];// Data fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchLibrary()),
                    dispatch(fetchFavorites()),
                    dispatch(fetchLists()),
                    dispatch(fetchActivity()),
                    dispatch(fetchTrendingPapers()),
                    dispatch(fetchLibraryStats())
                ]);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        
        // Set up activity auto-refresh
                const refreshActivity = () => dispatch(fetchActivity());
        const activityRefreshInterval = setInterval(refreshActivity, 30000); // Refresh every 30 seconds
        
        if (papers.length === 0 && lists.length === 0) {
            fetchData();
        }

        return () => {
            clearInterval(activityRefreshInterval);
        };
    }, [dispatch]);    // Paper selection handlers
    const handlePaperSelect = (paperId) => {
        setSelectedPapers(prev => prev.includes(paperId)
            ? prev.filter(id => id !== paperId)
            : [...prev, paperId]
        );
    };
    
    const handleSelectAll = () => {
        setSelectedPapers(prev =>
            prev.length === filteredPapers.length
                ? []
                : filteredPapers.map(paper => paper._id)
        );
    };

    // Refresh activity feed after actions
    const refreshAfterAction = async (action) => {
        await action();
        dispatch(fetchActivity());
    };

    // List operations
    const handleCreateList = () => {
        if (listData.name.trim()) {
            refreshAfterAction(async () => {
                await dispatch(createList({ ...listData, isPublic: false }));
                setModalState(prev => ({ ...prev, createList: false }));
            });
        }
    };

    // Modal handlers
    const toggleModal = (modalName) => {
        setModalState(prev => ({ ...prev, [modalName]: !prev[modalName] }));
    };

    if (loading && papers.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                <p className="ml-2 text-lg text-gray-600">Loading library...</p>
            </div>
        );
    }

    // Filter and sort papers based on selection
    const getFilteredPapers = () => {
        let filtered = [...papers];

        // Apply search first
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(paper => {
                return (
                    paper.title.toLowerCase().includes(searchLower) ||
                    (paper.abstract && paper.abstract.toLowerCase().includes(searchLower)) ||
                    (paper.authors && (
                        typeof paper.authors === 'string' 
                            ? paper.authors.toLowerCase().includes(searchLower)
                            : paper.authors.join(' ').toLowerCase().includes(searchLower)
                    )) ||
                    (paper.keywords && paper.keywords.some(keyword =>
                        keyword.toLowerCase().includes(searchLower)
                    ))
                );
            });
        }

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

    // Get filtered papers
    const filteredPapers = getFilteredPapers();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <LibraryHeader
                papersCount={papers?.length || 0}
                favoritesCount={favorites.length}
                listsCount={lists.length}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterOption={filterOption}
                onFilterChange={setFilterOption}
                sortOption={sortOption}
                onSortChange={setSortOption}
            />

            <BulkActionsToolbar
                selectedCount={selectedPapers.length}
                totalCount={filteredPapers.length}
                onSelectAll={handleSelectAll}
                onTagClick={() => toggleModal('tag')}
                onAddToListClick={() => toggleModal('addToList')}
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPapers.map(paper => (                    <ErrorBoundary key={paper._id} fallback={<div>Error rendering paper</div>}>
                        <PaperCard
                            paper={paper}
                            isSelected={selectedPapers.includes(paper._id)}
                            isFavorite={favorites.some(fav => fav?._id === paper._id)}
                            onSelect={handlePaperSelect}
                            onToggleFavorite={() => refreshAfterAction(() => dispatch(toggleFavorite(paper._id)))}
                            onViewDetails={() => {
                                setSelectedPaper(paper);
                                setShowDetailsModal(true);
                            }}
                            onAddToList={() => {
                                setSelectedPapers([paper._id]);
                                toggleModal('addToList');
                            }}
                        />
                    </ErrorBoundary>
                ))}
            </div>

            <EmptyState visible={filteredPapers.length === 0} />

            <ActivityFeed activities={activities} papers={papers} />

            {/* Paper Details Modal */}
            <PaperDetailsModal
                isOpen={showDetailsModal}
                paper={selectedPaper}
                isFavorite={selectedPaper && favorites.some(fav => fav?._id === selectedPaper._id)}
                onClose={() => setShowDetailsModal(false)}
                onToggleFavorite={() => selectedPaper && refreshAfterAction(() => dispatch(toggleFavorite(selectedPaper._id)))}
                onAddToList={() => {
                    if (selectedPaper) {
                        setSelectedPapers([selectedPaper._id]);
                        setShowDetailsModal(false);
                        toggleModal('addToList');
                    }
                }}
                onDownload={() => selectedPaper && window.open(selectedPaper.url, '_blank')}
            />

            <ReadingListsSection
                lists={lists}
                onCreateList={() => toggleModal('createList')}
            />

            {/* Modals */}
            <AddToListModal
                isOpen={modalState.addToList}
                lists={lists}
                onClose={() => toggleModal('addToList')}
                onCreateList={() => {
                    toggleModal('addToList');
                    toggleModal('createList');
                }}
                onSubmit={(listId) => {                    refreshAfterAction(async () => {
                        await dispatch(addToList({ listId, paperIds: selectedPapers }));
                        setSelectedPapers([]);
                        toggleModal('addToList');
                    });
                }}
            />

            <CreateListModal
                isOpen={modalState.createList}
                listData={listData}
                onClose={() => toggleModal('createList')}
                onChange={setListData}
                onSubmit={handleCreateList}
            />

            <TagModal
                isOpen={modalState.tag}
                tagInput={tagInput}
                onClose={() => toggleModal('tag')}
                onChange={setTagInput}
                onSubmit={(tags) => {                    refreshAfterAction(async () => {
                        await dispatch(bulkTagPapers({
                            paperIds: selectedPapers,
                            tags: tags.split(',').map(tag => tag.trim()),
                            operation: 'add'
                        }));
                        setTagInput('');
                        toggleModal('tag');
                        setSelectedPapers([]);
                    });
                }}
            />
        </div>
    );
};

export default LibraryPage;