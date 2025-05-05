import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, FileText } from 'lucide-react';

export const ReadingListCard = ({ list }) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 h-full flex flex-col"
            onClick={() => navigate(`/reading-lists/${list._id}`)}
        >
            {/* Colored accent bar */}
            <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <div className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-50 p-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">{list.name}</h3>
                </div>

                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    <span>{list.papers?.length || 0} papers</span>
                </p>

                <p className="text-sm text-gray-600 mt-1 flex-grow">
                    {list.description || 'No description provided for this reading list.'}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Updated {new Date(list.updatedAt || list.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-medium text-blue-600">View List →</span>
                </div>
            </div>
        </div>
    );
};