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
    const { lists } = useSelector(state => state.lists);
    const { feed: activities } = useSelector(state => state.activity);

    // Derived state
    const favorites = Array.isArray(rawFavorites) ? rawFavorites : rawFavorites?.papers || [];

    // Data fetching
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

        if (papers.length === 0 && lists.length === 0) fetchData();
    }, [dispatch]);

    // Paper selection handlers
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

    // List operations
    const handleCreateList = () => {
        if (listData.name.trim()) {
            dispatch(createList({ ...listData, isPublic: false }))
                .then(() => setModalState(prev => ({ ...prev, createList: false })));
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
        if (searchTerm) {
            filtered = filtered.filter(paper =>
                paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (paper.abstract && paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (paper.authors && paper.authors.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
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
                {filteredPapers.map(paper => (
                    <ErrorBoundary key={paper._id} fallback={<div>Error rendering paper</div>}>
                        <PaperCard
                            paper={paper}
                            isSelected={selectedPapers.includes(paper._id)}
                            isFavorite={favorites.some(fav => fav?._id === paper._id)}
                            onSelect={handlePaperSelect}
                            onToggleFavorite={() => dispatch(toggleFavorite(paper._id))}
                            onViewDetails={() => navigate(`/library/${paper._id}`)}
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
                onSubmit={(listId) => {
                    dispatch(addToList({ listId, paperIds: selectedPapers }))
                        .then(() => {
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
                onSubmit={(tags) => {
                    dispatch(bulkTagPapers({
                        paperIds: selectedPapers,
                        tags: tags.split(',').map(tag => tag.trim()),
                        operation: 'add'
                    })).then(() => {
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