import React from 'react';
import { BarChart, Activity, FileText, Users, Clock, ArrowUp, ArrowDown } from 'lucide-react';

const DashboardPage = () => {
    const stats = [
        {
            title: 'Total Papers',
            value: '24',
            icon: <FileText className="h-8 w-8 text-blue-600" />,
            change: '+4',
            changeType: 'increase',
        },
        {
            title: 'Papers Read',
            value: '18',
            icon: <BarChart className="h-8 w-8 text-green-600" />,
            change: '+2',
            changeType: 'increase',
        },
        {
            title: 'Citations',
            value: '156',
            icon: <Activity className="h-8 w-8 text-purple-600" />,
            change: '+23',
            changeType: 'increase',
        },
        {
            title: 'Collaborators',
            value: '7',
            icon: <Users className="h-8 w-8 text-amber-600" />,
            change: '0',
            changeType: 'neutral',
        },
    ];

    const recentPapers = [
        {
            id: 1,
            title: 'Advancements in Natural Language Processing',
            date: '2 days ago',
            status: 'Analyzed',
        },
        {
            id: 2,
            title: 'Deep Learning for Computer Vision',
            date: '1 week ago',
            status: 'Analyzed',
        },
        {
            id: 3,
            title: 'Reinforcement Learning: A Survey',
            date: '2 weeks ago',
            status: 'Analyzed',
        },
        {
            id: 4,
            title: 'Machine Learning in Healthcare',
            date: '3 weeks ago',
            status: 'Analyzed',
        },
    ];

    return (
        <div>
            <div className="px-4 py-6 sm:px-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">Welcome back! Here's an overview of your research.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">{stat.icon}</div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm flex items-center">
                                {stat.changeType === 'increase' ? (
                                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                                ) : stat.changeType === 'decrease' ? (
                                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                                ) : (
                                    <span className="h-4 w-4 mr-1" />
                                )}
                                <span
                                    className={`${stat.changeType === 'increase'
                                            ? 'text-green-500'
                                            : stat.changeType === 'decrease'
                                                ? 'text-red-500'
                                                : 'text-gray-500'
                                        }`}
                                >
                                    {stat.change} this month
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Papers */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Papers</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Your most recently uploaded research papers.
                    </p>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Status
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">View</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentPapers.map((paper) => (
                                            <tr key={paper.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{paper.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                        {paper.date}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {paper.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-blue-600 hover:text-blue-900">
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all papers <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;