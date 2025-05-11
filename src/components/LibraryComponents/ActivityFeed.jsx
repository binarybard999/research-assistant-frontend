import React, { useState, useEffect, useRef } from 'react';
import { Activity, FileText, BookOpen, Star, Tag } from 'lucide-react';

export const ActivityFeed = ({ activities = [], papers = [] }) => {
    const [visibleCount, setVisibleCount] = useState(5);
    const [autoScroll, setAutoScroll] = useState(true);
    const feedRef = useRef(null);

    // Auto-scroll to new activities
    useEffect(() => {
        if (autoScroll && feedRef.current && activities.length > 0) {
            feedRef.current.scrollTop = 0;
        }
    }, [activities, autoScroll]);

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 5);
        setAutoScroll(false); // Disable auto-scroll when manually loading more
    };

    const handleScrollLoad = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && activities.length > visibleCount) {
            handleShowMore();
        }
    };

    return (
        <div className="mt-10 bg-white shadow-md rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">
                            <Activity className="h-5 w-5" />
                        </span>
                        Recent Activity
                    </h2>
                    <button
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => setVisibleCount(5)}
                    >
                        Reset View
                    </button>
                </div>
            </div>

            <div className="max-h-96 overflow-y-auto" onScroll={handleScrollLoad} ref={feedRef}>
                {activities.length > 0 ? (
                    <ul className="divide-y">
                        {[...activities]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, visibleCount)
                            .map((activity, index) => (
                                <ActivityItem
                                    key={activity._id || index}
                                    activity={activity}
                                    papers={papers}
                                />
                            ))}

                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <Activity className="h-12 w-12 text-gray-300 mb-3" />
                        <p className="text-gray-500 mb-1">No recent activity recorded.</p>
                        <p className="text-sm text-gray-400">Activities will appear here as you interact with papers.</p>
                    </div>
                )}
            </div>
            {activities.length > 5 && (
                <div className="p-4 border-t border-gray-100 text-center">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All Activity
                    </button>
                </div>
            )}
        </div>
    );
};

const ActivityItem = ({ activity, papers }) => {
    const getIcon = () => {
        if (activity.action.includes('favorite')) return <Star className="h-4 w-4 text-yellow-500" />;
        if (activity.action.includes('tag')) return <Tag className="h-4 w-4 text-green-600" />;
        if (activity.action.includes('paper')) return <FileText className="h-4 w-4 text-blue-600" />;
        if (activity.action.includes('reading_list')) return <BookOpen className="h-4 w-4 text-indigo-600" />;
        return <Activity className="h-4 w-4 text-gray-600" />;
    };

    const getActionColor = () => {
        if (activity.action.includes('favorite')) return 'bg-yellow-50';
        if (activity.action.includes('tag')) return 'bg-green-50';
        if (activity.action.includes('paper')) return 'bg-blue-50';
        if (activity.action.includes('reading_list')) return 'bg-indigo-50';
        return 'bg-gray-50';
    };

    const formatActionText = (action) => {
        return action
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace('Paper', 'paper');
    };

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);
    };

    const paperTitle = activity.paper && papers.find(p => p._id === activity.paper)?.title;

    return (
        <li className="py-4 px-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
                <div className={`p-2 ${getActionColor()} rounded-full mr-4 flex-shrink-0`}>
                    {getIcon()}
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-800">
                        {formatActionText(activity.action)}
                        {paperTitle && (
                            <span className="font-medium">
                                {' - '}
                                {truncateText(paperTitle, 50)}
                            </span>
                        )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {formattedDate(activity.createdAt)}
                    </p>
                </div>
            </div>
        </li>
    );
};

const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};