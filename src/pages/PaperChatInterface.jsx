import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    Send,
    FileUp,
    ChevronRight,
    ChevronLeft,
    FileText,
    Upload,
    X,
    Check,
    Loader2
} from 'lucide-react';
import apiService from '../services/apiService';

import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

const PaperChatInterface = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paper, setPaper] = useState(null);
    const [knowledgeBase, setKnowledgeBase] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [responseLoading, setResponseLoading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [uploadingPaper, setUploadingPaper] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadFormData, setUploadFormData] = useState({
        title: '',
        authors: '',
        abstract: '',
        file: null
    });
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [keywordsExpanded, setKeywordsExpanded] = useState(false);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchPaperAndKnowledgeBase = async () => {
            try {
                setLoading(true);
                const paperResponse = await apiService.get(`/papers/${id}`);
                setPaper(paperResponse.data);

                try {
                    const kbResponse = await apiService.get(`/knowledge-base/${id}`);
                    setKnowledgeBase(kbResponse.data);
                } catch (kbError) {
                    console.error('Knowledge base might not exist yet:', kbError);
                }

                // Fetch conversation history
                try {
                    const chatHistoryResponse = await apiService.get(`/paper-chat/${id}/chat/history`);
                    if (chatHistoryResponse.data && chatHistoryResponse.data.length > 0) {
                        setMessages(chatHistoryResponse.data);
                    } else {
                        // Initialize with a welcome message if no history
                        setMessages([{
                            role: 'system',
                            content: `Welcome to the chat for "${paperResponse.data.title}". You can ask questions about this paper or upload additional related papers.`
                        }]);
                    }
                } catch (chatError) {
                    console.error('Error fetching chat history:', chatError);
                    // Initialize with a welcome message
                    setMessages([{
                        role: 'system',
                        content: `Welcome to the chat for "${paperResponse.data.title}". You can ask questions about this paper or upload additional related papers.`
                    }]);
                }
            } catch (error) {
                console.error('Error fetching paper data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaperAndKnowledgeBase();
    }, [id]);

    useEffect(() => {
        scrollToBottom();
        console.log("Messages updated:", messages);
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = {
            role: 'user',
            content: inputMessage
        };

        setMessages(msgs => [...msgs, userMessage]);
        setInputMessage('');
        setResponseLoading(true);

        try {
            // Send request to backend to get response from Gemini
            const response = await apiService.post(`/paper-chat/${id}/chat`, {
                question: inputMessage
            });
            console.log("Response:", response.data);

            if (response.data && response.data.assistantMessage) {
                const botMessage = {
                    role: 'assistant',
                    content: response.data.assistantMessage.content
                };

                console.log("Bot message:", botMessage);

                setMessages(msgs => [...msgs, botMessage]);
            }
        } catch (error) {
            console.error('Error getting response:', error);
            setMessages(msgs => [...msgs, {
                role: 'system',
                content: 'Sorry, I had trouble processing your request. Please try again later.'
            }]);
        } finally {
            setResponseLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setUploadFormData({
                ...uploadFormData,
                file: e.target.files[0]
            });
        }
    };

    const handleUploadFormChange = (e) => {
        const { name, value } = e.target;
        setUploadFormData({
            ...uploadFormData,
            [name]: value
        });
    };

    const submitUploadForm = async (e) => {
        e.preventDefault();
        if (!uploadFormData.file || !uploadFormData.title) {
            setUploadError('Please provide a title and file');
            return;
        }

        setUploadingPaper(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('title', uploadFormData.title);
            formData.append('authors', uploadFormData.authors);
            formData.append('abstract', uploadFormData.abstract);
            formData.append('file', uploadFormData.file);

            const response = await apiService.post('/papers/upload', formData);

            setUploadSuccess(true);
            setUploadFormData({
                title: '',
                authors: '',
                abstract: '',
                file: null
            });

            // Add a system message about the successful upload to the UI
            const systemMessage = {
                role: 'system',
                content: `Successfully uploaded paper: "${uploadFormData.title}". This paper has been added to your knowledge base.`
            };
            setMessages(msgs => [...msgs, systemMessage]);

            // Save the system message to the chat history
            try {
                await apiService.post(`/paper-chat/${id}/system`, {
                    content: systemMessage.content
                });
            } catch (systemMsgError) {
                console.error('Error saving system message:', systemMsgError);
            }

            // Refresh the knowledge base
            try {
                const kbResponse = await apiService.get(`/knowledge-base/${id}`);
                setKnowledgeBase(kbResponse.data);
            } catch (kbError) {
                console.error('Error refreshing knowledge base:', kbError);
            }

            // Close the upload form after a delay
            setTimeout(() => {
                setShowUploadForm(false);
                setUploadSuccess(false);

                // Optionally, you can navigate to the new paper
                // navigate(`/papers/${response.data.paper.id}`);
            }, 2000);
        } catch (error) {
            console.error('Error uploading paper:', error);
            setUploadError(error.response?.data?.message || 'Error uploading paper');
        } finally {
            setUploadingPaper(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                <p className="ml-2 text-lg text-gray-600">Loading paper data...</p>
            </div>
        );
    }

    return (
        <div className="flex h-full paper-chat bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 relative`}>
                {sidebarOpen && (
                    <div className="p-4 h-full flex flex-col overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Paper Details</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <h3 className="font-bold text-lg text-blue-800">{paper.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{paper.authors}</p>
                        </div>

                        {paper.abstract && (
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-700 mb-1">Abstract</h4>
                                <p className="text-sm text-gray-600">{paper.abstract}</p>
                            </div>
                        )}

                        {paper.keywords && paper.keywords.length > 0 && (
                            <div className="mb-4">
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => setKeywordsExpanded(!keywordsExpanded)}>
                                    <h4 className="font-semibold text-gray-700">Keywords</h4>
                                    <ChevronRight className={`h-4 w-4 transition-transform ${keywordsExpanded ? 'transform rotate-90' : ''}`} />
                                </div>

                                {keywordsExpanded ? (
                                    <div className="flex flex-wrap gap-1 mt-2 max-h-40 overflow-y-auto">
                                        {paper.keywords.map((keyword, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {paper.keywords.slice(0, 5).map((keyword, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                {keyword}
                                            </span>
                                        ))}
                                        {paper.keywords.length > 5 && (
                                            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                                                +{paper.keywords.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-auto">
                            <button
                                onClick={() => setShowUploadForm(true)}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Related Paper
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-white shadow-sm p-4 flex items-center">
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="mr-3 text-gray-600 hover:text-gray-800"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    )}
                    <FileText className="h-6 w-6 text-blue-600 mr-2" />
                    <h1 className="font-bold text-lg text-gray-800 truncate">{paper.title}</h1>
                </div>

                {/* This container scrolls independently */}
                <div
                    className="flex-1 overflow-y-auto p-4 bg-gray-50"
                    ref={chatContainerRef}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${msg.role === 'user'
                                ? 'flex justify-end'
                                : 'flex justify-start'
                                }`}
                        >
                            <div
                                className={`max-w-3/4 p-3 rounded-lg ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : msg.role === 'system'
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-white text-gray-800 shadow-sm'
                                    }`}
                            >
                                {msg.role === 'user' ? (
                                    // For user messages, display as plain text
                                    msg.content
                                ) : (
                                    // For system and assistant messages, render as markdown
                                    <div className="markdown-content">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {responseLoading && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
                                <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
                                <span className="text-gray-600">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area stays fixed at the bottom */}
                <div className="bg-white p-4 border-t">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask a question about this paper..."
                            className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={!inputMessage.trim() || responseLoading}
                            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Upload Form Modal */}
            {showUploadForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Upload Related Paper</h2>
                            <button
                                onClick={() => {
                                    setShowUploadForm(false);
                                    setUploadError(null);
                                    setUploadSuccess(false);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {uploadError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                                {uploadError}
                            </div>
                        )}

                        {uploadSuccess ? (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                                <Check className="h-5 w-5 text-green-600 mr-2" />
                                <span className="text-green-700">Paper uploaded successfully!</span>
                            </div>
                        ) : (
                            <form onSubmit={submitUploadForm} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={uploadFormData.title}
                                        onChange={handleUploadFormChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter paper title"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Authors</label>
                                    <input
                                        type="text"
                                        name="authors"
                                        value={uploadFormData.authors}
                                        onChange={handleUploadFormChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Author names (comma separated)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Abstract</label>
                                    <textarea
                                        name="abstract"
                                        value={uploadFormData.abstract}
                                        onChange={handleUploadFormChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Provide a brief abstract of the paper"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Upload PDF</label>
                                    <div className="mt-1">
                                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <FileUp className="w-8 h-8 mb-2 text-gray-400" />
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PDF only (MAX. 10MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                accept="application/pdf"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                    {uploadFormData.file && (
                                        <div className="mt-2 flex items-center">
                                            <FileText className="h-4 w-4 text-blue-500 mr-2" />
                                            <span className="text-sm text-gray-600">{uploadFormData.file.name}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadForm(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={uploadingPaper || !uploadFormData.file || !uploadFormData.title}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center"
                                    >
                                        {uploadingPaper ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload Paper
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaperChatInterface;