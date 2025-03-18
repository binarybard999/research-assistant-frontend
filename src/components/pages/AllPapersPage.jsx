import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Filter, Download, Calendar, Tag, ExternalLink, Loader2, MessageSquare, Edit } from 'lucide-react';
import apiService from '../../services/apiService';

const AllPapersPage = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('all');
    const [sortOption, setSortOption] = useState('newest');
    const [error, setError] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                setLoading(true);
                const response = await apiService.get('/api/v1/papers/');
                setPapers(response.data);
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
        setShowDetailsDialog(true);
    };

    const handleEditPaper = (paperId, e) => {
        e.stopPropagation();
        navigate(`/papers/${paperId}/edit`);
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
                        {/* Search bar - Fixed consistent styling */}
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Search papers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter dropdown - Fixed consistent styling */}
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

                        {/* Sort dropdown - Fixed consistent styling */}
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3z" />
                                </svg>
                            </div>
                            <select
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 pr-8 sm:text-sm border-gray-300 rounded-md appearance-none"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="title-asc">Title (A-Z)</option>
                                <option value="title-desc">Title (Z-A)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Papers list */}
            {filteredPapers.length === 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-16 sm:px-6 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No papers found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchTerm ? 'No papers match your search criteria.' : 'Get started by uploading your first research paper.'}
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate('/upload')}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <FileText className="h-5 w-5 mr-2" />
                                Upload New Paper
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {filteredPapers.map((paper) => (
                            <li key={paper._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handlePaperClick(paper)}>
                                <div className="px-4 py-6 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                                                <FileText className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                                                    {paper.title}
                                                </h3>
                                                <div className="mt-1 flex items-center">
                                                    {paper.authors && (
                                                        <span className="text-sm text-gray-500">{paper.authors}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${paper.summary ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {paper.summary ? 'Analyzed' : 'Not Analyzed'}
                                            </span>
                                        </div>
                                    </div>

                                    {paper.abstract && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {paper.abstract}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-4">
                                        <div className="flex items-center">
                                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            {formatDate(paper.createdAt || Date.now())}
                                        </div>

                                        {paper.keywords && paper.keywords.length > 0 && (
                                            <div className="flex items-center">
                                                <Tag className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                <div className="flex flex-wrap gap-1">
                                                    {paper.keywords.slice(0, 3).map((keyword, index) => (
                                                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                    {paper.keywords.length > 3 && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                            +{paper.keywords.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex ml-auto space-x-3">
                                            <button
                                                onClick={(e) => handleEditPaper(paper._id, e)}
                                                className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500"
                                            >
                                                Edit
                                                <Edit className="ml-1 h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={(e) => handleChatClick(paper._id, e)}
                                                className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500"
                                            >
                                                Chat
                                                <MessageSquare className="ml-1 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Pagination (future implementation) */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg shadow">
                <div className="flex-1 flex justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPapers.length}</span> of{' '}
                            <span className="font-medium">{filteredPapers.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <a
                                href="#"
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Paper Details Dialog */}
            {showDetailsDialog && selectedPaper && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"
                            onClick={() => setShowDetailsDialog(false)}
                            aria-hidden="true"
                        ></div>

                        {/* Dialog positioning */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        {/* Dialog panel */}
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                            <div className="absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => setShowDetailsDialog(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        {selectedPaper.title}
                                    </h3>

                                    {selectedPaper.authors && (
                                        <div className="mt-2">
                                            <h4 className="text-sm font-medium text-gray-700">Authors</h4>
                                            <p className="text-sm text-gray-500">{selectedPaper.authors}</p>
                                        </div>
                                    )}

                                    {selectedPaper.abstract && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-700">Abstract</h4>
                                            <p className="mt-1 text-sm text-gray-500 max-h-60 overflow-y-auto">
                                                {selectedPaper.abstract}
                                            </p>
                                        </div>
                                    )}

                                    {selectedPaper.keywords && selectedPaper.keywords.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-700">Keywords</h4>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {selectedPaper.keywords.map((keyword, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        {keyword}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedPaper.summary && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-700">Summary</h4>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {selectedPaper.summary}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-700">Details</h4>
                                        <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                                            <div>
                                                <span className="text-xs text-gray-500">Date Added:</span>
                                                <p className="text-sm text-gray-900">{formatDate(selectedPaper.createdAt || Date.now())}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Status:</span>
                                                <p className="text-sm">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedPaper.summary ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {selectedPaper.summary ? 'Analyzed' : 'Not Analyzed'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                    onClick={() => navigate(`/papers/${selectedPaper._id}`)}
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Full Details
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                                    onClick={() => navigate(`/papers/${selectedPaper._id}/chat`)}
                                >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Chat About Paper
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                                    onClick={() => navigate(`/papers/${selectedPaper._id}/edit`)}
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Paper
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                    onClick={() => setShowDetailsDialog(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllPapersPage;