import React from 'react';
import { FileText, Calendar, Tag, ExternalLink, MessageSquare, Edit, Trash2 } from 'lucide-react';

const PaperDetailsDialog = ({
    paper,
    showDetailsDialog,
    setShowDetailsDialog,
    formatDate,
    onEditClick,
    onChatClick,
    onDeleteClick
}) => {
    if (!showDetailsDialog || !paper) return null;

    // Prevent closing when clicking outside
    const handleDialogClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {paper.title}
                            </h3>
                            {paper.authors && (
                                <p className="mt-2 text-sm text-gray-500">
                                    {paper.authors}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        {paper.abstract && (
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-900">Abstract</h4>
                                <p className="mt-1 text-sm text-gray-600">
                                    {paper.abstract}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">Added On</h4>
                                <p className="mt-1 text-sm text-gray-600 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                    {formatDate(paper.createdAt)}
                                </p>
                            </div>

                            {paper.keywords && paper.keywords.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Keywords</h4>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {paper.keywords.map((keyword, index) => (
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
                        </div>

                        {paper.url && (
                            <div className="mt-4">
                                <a
                                    href={paper.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                                >
                                    View Original Paper
                                    <ExternalLink className="ml-1 h-4 w-4" />
                                </a>
                            </div>
                        )}
                    </div>                    <div className="mt-5 sm:mt-6 space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditClick(paper._id, e);
                                    setShowDetailsDialog(false);
                                }}
                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onChatClick(paper._id, e);
                                    setShowDetailsDialog(false);
                                }}
                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Chat
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteClick(paper, e);
                                    setShowDetailsDialog(false);
                                }}
                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </button>
                        </div>
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                            onClick={() => setShowDetailsDialog(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaperDetailsDialog;
