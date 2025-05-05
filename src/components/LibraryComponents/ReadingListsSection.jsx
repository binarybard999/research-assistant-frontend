import React from 'react';
import { BookOpen, PlusCircle, ChevronRight } from 'lucide-react';
import { ReadingListCard } from './ReadingListCard';
import { useNavigate } from 'react-router-dom';

export const ReadingListsSection = ({ lists, onCreateList }) => {
    const navigate = useNavigate();

    return (
        <div className="mt-12 bg-white shadow-md rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">
                        <BookOpen className="h-5 w-5" />
                    </span>
                    My Reading Lists
                </h2>
                <button
                    onClick={onCreateList}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusCircle className="h-4 w-4" />
                    <span>Create List</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {lists.length > 0 ? (
                    <>
                        {lists.slice(0, 3).map(list => (
                            <ReadingListCard key={list._id} list={list} />
                        ))}
                        {lists.length > 3 && (
                            <div
                                onClick={() => navigate('/reading-lists')}
                                className="flex justify-center items-center bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all border border-gray-100 hover:border-blue-200"
                            >
                                <div className="flex items-center gap-2 text-blue-600 py-6">
                                    <span className="font-medium">View all {lists.length} lists</span>
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="md:col-span-3 flex flex-col items-center justify-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <BookOpen className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-gray-500 mb-4">No reading lists created yet.</p>
                        <button
                            onClick={onCreateList}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Create Your First List</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
