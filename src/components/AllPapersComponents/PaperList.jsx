import React from 'react';
import { FileText } from 'lucide-react';
import PaperCard from './PaperCard';

const PaperList = ({
    papers,
    onPaperClick,
    onEditClick,
    onChatClick,
    onDeleteClick,
    formatDate,
    navigate
}) => {
    if (papers.length === 0) {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-16 sm:px-6 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No papers found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by uploading your first research paper.
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
        );
    }

    return (
        <div className="space-y-6">
            {papers.map((paper) => (
                <div key={paper._id} className="bg-white shadow overflow-hidden sm:rounded-lg hover:shadow-lg transition-shadow duration-200">
                    <PaperCard
                        paper={paper}
                        onPaperClick={onPaperClick}
                        onEditClick={onEditClick}
                        onChatClick={onChatClick}
                        onDeleteClick={onDeleteClick}
                        formatDate={formatDate}
                    />
                </div>
            ))}
        </div>
    );
};

export default PaperList;
