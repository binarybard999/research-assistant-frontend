import React from 'react';
import { FileText, Calendar, Tag, Edit, MessageSquare, Trash2 } from 'lucide-react';

const PaperCard = ({
    paper,
    onPaperClick,
    onEditClick,
    onChatClick,
    onDeleteClick,
    formatDate
}) => {
    return (
        <div
            className="px-4 py-6 sm:px-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onPaperClick(paper)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-1">
                            {paper.title}
                        </h3>
                        <div className="mt-1">
                            {paper.authors && (
                                <span className="text-sm text-gray-500 line-clamp-1">{paper.authors}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${paper.summary ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
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
                    {formatDate(paper.createdAt)}
                </div>

                {paper.keywords && paper.keywords.length > 0 && (
                    <div className="flex items-center">
                        <Tag className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <div className="flex flex-wrap gap-1">
                            {paper.keywords.slice(0, 3).map((keyword, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                >
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

                <div className="flex ml-auto space-x-4">
                    <button
                        onClick={(e) => onEditClick(paper._id, e)}
                        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                    >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                    </button>
                    <button
                        onClick={(e) => onChatClick(paper._id, e)}
                        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
                    >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat
                    </button>
                    <button
                        onClick={(e) => onDeleteClick(paper, e)}
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaperCard;
