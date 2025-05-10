import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Filter, Download, Calendar, Tag, ExternalLink, Loader2, MessageSquare, Edit, Trash2 } from 'lucide-react';
import apiService from '../services/apiService';
import SearchBar from '../components/AllPapersComponents/SearchBar';
import FilterDropdown from '../components/AllPapersComponents/FilterDropdown';
import SortDropdown from '../components/AllPapersComponents/SortDropdown';
import PaperList from '../components/AllPapersComponents/PaperList';
import PaperDetailsDialog from '../components/AllPapersComponents/PaperDetailsDialog';
import DeleteConfirmationDialog from '../components/AllPapersComponents/DeleteConfirmationDialog';

const AllPapersPage = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('all');
    const [sortOption, setSortOption] = useState('newest');
    const [error, setError] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [paperToDelete, setPaperToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                setLoading(true);
                const response = await apiService.get('/papers/');
                setPapers(response.data);
                console.log(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching papers:', err);
                setError('Failed to load papers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, []);

    const filteredPapers = papers
        .filter(paper => {
            // Filter by search term
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                return (
                    paper.title.toLowerCase().includes(searchLower) ||
                    (paper.abstract && paper.abstract.toLowerCase().includes(searchLower)) ||
                    (paper.authors && paper.authors.toLowerCase().includes(searchLower)) ||
                    (paper.keywords && paper.keywords.some(keyword =>
                        keyword.toLowerCase().includes(searchLower)
                    ))
                );
            }
            return true;
        })
        .filter(paper => {
            // Filter by status
            if (filterOption === 'all') return true;
            if (filterOption === 'analyzed' && paper.summary) return true;
            if (filterOption === 'not-analyzed' && !paper.summary) return true;
            return false;
        })
        .sort((a, b) => {
            // Sort by selected option
            if (sortOption === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortOption === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortOption === 'title-asc') {
                return a.title.localeCompare(b.title);
            } else if (sortOption === 'title-desc') {
                return b.title.localeCompare(a.title);
            }
            return 0;
        });

    const handlePaperClick = (paper) => {
        setSelectedPaper(paper);
        console.log(paper);
        setShowDetailsDialog(true);
    };

    const handleEditPaper = (paperId, e) => {
        e.stopPropagation();
        navigate(`/papers/${paperId}/edit`);
    };

    const handleDeletePaper = async () => {
        if (!paperToDelete) return;

        try {
            setDeleteLoading(true);
            await apiService.delete(`/papers/${paperToDelete._id}`);

            // Remove the deleted paper from state
            setPapers(papers.filter(paper => paper._id !== paperToDelete._id));
            setShowDeleteDialog(false);
            setPaperToDelete(null);
        } catch (err) {
            console.error('Error deleting paper:', err);
            setError('Failed to delete paper. Please try again.');
        } finally {
            setDeleteLoading(false);
        }
    };

    const showDeleteConfirmation = (paper, e) => {
        e.stopPropagation();
        setPaperToDelete(paper);
        setShowDeleteDialog(true);
    };

    const handleChatClick = (paperId, e) => {
        e.stopPropagation();
        navigate(`/papers/${paperId}/chat`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                <p className="ml-2 text-lg text-gray-600">Loading papers...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Research Papers</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Browse and manage all your uploaded research papers
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button
                        onClick={() => navigate('/upload')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <FileText className="h-5 w-5 mr-2" />
                        Upload New Paper
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <FilterDropdown filterOption={filterOption} setFilterOption={setFilterOption} />
                        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
                    </div>
                </div>
            </div>            <PaperList
                papers={filteredPapers}
                onPaperClick={handlePaperClick}
                onEditClick={handleEditPaper}
                onChatClick={handleChatClick}
                onDeleteClick={showDeleteConfirmation}
                formatDate={formatDate}
                navigate={navigate}
            />

            <PaperDetailsDialog
                paper={selectedPaper}
                showDetailsDialog={showDetailsDialog}
                setShowDetailsDialog={setShowDetailsDialog}
                onEditClick={handleEditPaper}
                onChatClick={handleChatClick}
                onDeleteClick={showDeleteConfirmation}
                formatDate={formatDate}
            />

            <DeleteConfirmationDialog
                showDeleteDialog={showDeleteDialog}
                setShowDeleteDialog={setShowDeleteDialog}
                paperToDelete={paperToDelete}
                deleteLoading={deleteLoading}
                handleDeletePaper={handleDeletePaper}
            />
        </div>
    );
};

export default AllPapersPage;