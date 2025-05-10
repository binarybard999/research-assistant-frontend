import React, { useState, useEffect } from 'react';
import {
    X, FileText, Star, Calendar, Clock, Download, Share2,
    List, Tag, ExternalLink, BookOpen, ArrowLeft, ArrowRight,
    Users, Bookmark, Link, Copy, ChevronDown, AlignLeft
} from 'lucide-react';

export const PaperDetailsModal = ({
    isOpen,
    paper,
    isFavorite,
    onClose,
    onToggleFavorite,
    onAddToList,
    onDownload
}) => {
    const [activeTab, setActiveTab] = useState('abstract');
    const [showCitationDropdown, setShowCitationDropdown] = useState(false);

    // Close modal with escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen || !paper) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const readingTime = Math.ceil((paper.wordCount || 1200) / 200);

    // Citation formats
    const citations = {
        apa: `${(paper.authors || 'Unknown Author').split(' and ')[0]} et al. (${new Date(paper.createdAt).getFullYear()}). ${paper.title}. ${paper.venue || 'Journal'}. ${paper.doi ? `https://doi.org/${paper.doi}` : ''}`,
        mla: `${(paper.authors || 'Unknown Author').split(' and ')[0]}, et al. "${paper.title}." ${paper.venue || 'Journal'}, ${new Date(paper.createdAt).getFullYear()}.`,
        bibtex: `@article{${paper._id?.substring(0, 8) || 'unknown'},
  title={${paper.title}},
  author={${paper.authors || 'Unknown Author'}},
  journal={${paper.venue || 'Journal'}},
  year={${new Date(paper.createdAt).getFullYear()}}${paper.doi ? `,\n  doi={${paper.doi}}` : ''}
}`
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add a toast notification here
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30 p-4 overflow-y-auto backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col animate-fadeIn" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b sticky top-0 bg-white rounded-t-2xl z-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {paper.category || 'Research Paper'}
                            </span>
                            <span className="text-gray-500 text-sm flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" /> {readingTime} min read
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 pr-8 tracking-tight">{paper.title}</h2>
                        <div className="flex items-center text-gray-600 mt-2 gap-1">
                            <Users className="h-4 w-4 mr-1" />
                            <p>{paper.authors || 'Unknown author'}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b px-6 bg-white sticky top-[76px] z-10">
                    <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
                        <TabButton
                            active={activeTab === 'abstract'}
                            onClick={() => setActiveTab('abstract')}
                            label="Abstract"
                            icon={<BookOpen className="h-4 w-4" />}
                        />
                        <TabButton
                            active={activeTab === 'summary'}
                            onClick={() => setActiveTab('summary')}
                            label="Summary"
                            icon={<AlignLeft className="h-4 w-4" />}
                        />
                        <TabButton
                            active={activeTab === 'fulltext'}
                            onClick={() => setActiveTab('fulltext')}
                            label="Full Text"
                            icon={<FileText className="h-4 w-4" />}
                        />
                        <TabButton
                            active={activeTab === 'references'}
                            onClick={() => setActiveTab('references')}
                            label="References"
                            icon={<Link className="h-4 w-4" />}
                        />
                        <TabButton
                            active={activeTab === 'metadata'}
                            onClick={() => setActiveTab('metadata')}
                            label="Metadata"
                            icon={<Tag className="h-4 w-4" />}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'abstract' && (
                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                                {paper.abstract || 'No abstract available for this paper.'}
                            </p>

                            {paper.keywords?.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-sm font-medium text-gray-500 mb-3">Keywords</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {paper.keywords.map((keyword, idx) => (
                                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'summary' && (
                        <div className="prose max-w-none">
                            {paper.summary ? (
                                <div className="space-y-6">
                                    <div className="text-gray-700 leading-relaxed">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                                        {paper.summary}
                                    </div>
                                    {paper.keyFindings && paper.keyFindings.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Findings</h3>
                                            <ul className="list-disc pl-5 space-y-2">
                                                {paper.keyFindings.map((finding, idx) => (
                                                    <li key={idx} className="text-gray-700">{finding}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-xl">
                                    <AlignLeft className="h-16 w-16 text-blue-300 mb-4" />
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No summary available</h3>
                                    <p className="text-gray-500 mb-6 max-w-md">
                                        This paper hasn't been analyzed yet. You can view the abstract or full text for more information.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'fulltext' && (
                        <div className="prose max-w-none">
                            {paper.fullText ? (
                                <div className="text-gray-700 leading-relaxed">
                                    {paper.fullText}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-xl">
                                    <FileText className="h-16 w-16 text-blue-300 mb-4" />
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">Full text not available</h3>
                                    <p className="text-gray-500 mb-6 max-w-md">The full text for this paper hasn't been indexed yet. You can download the original paper to view the full content.</p>
                                    <button
                                        onClick={onDownload}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Original Paper
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'references' && (
                        <div>
                            {paper.references && paper.references.length > 0 ? (
                                <ul className="divide-y space-y-2">
                                    {paper.references.map((ref, idx) => (
                                        <li key={idx} className="py-3 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                                            <p className="text-sm text-gray-700">{ref}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-16 bg-gray-50 rounded-xl">
                                    <Link className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No references available</h3>
                                    <p className="text-gray-500">This paper doesn't have any indexed references.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'metadata' && (
                        <div className="space-y-8">
                            <MetadataSection
                                title="Publication Information"
                                icon={<Calendar className="h-5 w-5 text-blue-500" />}
                                items={[
                                    { label: "Published Date", value: formatDate(paper.createdAt) },
                                    { label: "Journal/Conference", value: paper.venue || "Not specified" },
                                    { label: "DOI", value: paper.doi || "Not available" },
                                    { label: "Publisher", value: paper.publisher || "Not specified" }
                                ]}
                            />

                            <MetadataSection
                                title="Document Details"
                                icon={<FileText className="h-5 w-5 text-blue-500" />}
                                items={[
                                    { label: "Word Count", value: paper.wordCount ? `${paper.wordCount.toLocaleString()} words` : "Not available" },
                                    { label: "Reading Time", value: `${readingTime} minutes` },
                                    { label: "File Type", value: paper.fileType || "PDF" },
                                    { label: "Added to Library", value: formatDate(paper.addedToLibraryAt || paper.createdAt) }
                                ]}
                            />

                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Copy className="h-5 w-5 text-blue-500" />
                                    <h3 className="text-lg font-medium text-gray-900">Citation</h3>
                                </div>

                                <div className="relative">
                                    <button
                                        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg text-left text-sm"
                                        onClick={() => setShowCitationDropdown(!showCitationDropdown)}
                                    >
                                        <span className="font-medium">APA Format</span>
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </button>

                                    {showCitationDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                            <div className="p-2">
                                                <button
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"
                                                    onClick={() => setShowCitationDropdown(false)}
                                                >
                                                    APA
                                                </button>
                                                <button
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"
                                                    onClick={() => setShowCitationDropdown(false)}
                                                >
                                                    MLA
                                                </button>
                                                <button
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded"
                                                    onClick={() => setShowCitationDropdown(false)}
                                                >
                                                    BibTeX
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-700 mb-2">{citations.apa}</p>
                                    <button
                                        onClick={() => copyToClipboard(citations.apa)}
                                        className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        <Copy className="h-3 w-3 mr-1" /> Copy citation
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer - Actions */}
                <div className="border-t p-4 bg-gray-50 rounded-b-2xl">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={onToggleFavorite}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isFavorite
                                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Star
                                    fill={isFavorite ? 'currentColor' : 'none'}
                                    className="h-4 w-4"
                                />
                                <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
                            </button>

                            <button
                                onClick={onAddToList}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                <List className="h-4 w-4" />
                                <span>Add to List</span>
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={onDownload}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                            </button>

                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                <Share2 className="h-4 w-4" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, label, icon }) => (
    <button
        onClick={onClick}
        className={`py-3 px-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${active
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
    >
        {icon}
        {label}
    </button>
);

const MetadataSection = ({ title, icon, items }) => (
    <div>
        <div className="flex items-center gap-2 mb-4">
            {icon}
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                        <dt className="text-xs text-gray-500">{item.label}</dt>
                        <dd className="text-sm font-medium text-gray-900">{item.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </div>
);