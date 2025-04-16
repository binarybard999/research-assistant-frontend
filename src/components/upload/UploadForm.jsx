import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPaper } from '../../redux/slices/uploadSlice.js';
import { FileUp, Users, FileText, Loader2, Check, AlertCircle, Info } from 'lucide-react';

const UploadForm = () => {
    const dispatch = useDispatch();
    const { loading, error, papers, progress, remainingUploads } = useSelector((state) => state.upload);
    const { user } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const selectedFiles = watch('files') || [];

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('authors', data.authors);
        formData.append('abstract', data.abstract);

        // Append all files
        Array.from(data.files).forEach(file => {
            formData.append('files', file);
        });

        dispatch(uploadPaper(formData));
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Upload Research Papers
                </h2>
                <div className="mt-2 bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm text-indigo-700 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        {user.tier} Tier: {remainingUploads !== null ? remainingUploads : user.uploadLimits.concurrentPapers} uploads remaining this month
                    </p>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                        <p className="text-red-700 font-medium">{error.message}</p>
                        {error.failedFiles && (
                            <ul className="mt-2 text-sm text-red-600">
                                {error.failedFiles.map((f, i) => (
                                    <li key={i}>• {f.filename} - {f.error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Title</label>
                    <input
                        {...register('title', { required: 'Title is required' })}
                        className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Enter paper title"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Authors
                    </label>
                    <input
                        {...register('authors', { required: 'Authors are required' })}
                        className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="Author names (comma separated)"
                    />
                    {errors.authors && (
                        <p className="mt-1 text-sm text-red-600">{errors.authors.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Abstract</label>
                    <textarea
                        {...register('abstract')}
                        className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        rows="4"
                        placeholder="Provide a brief abstract of your paper"
                    />
                </div>

                <div>
                    <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                        <FileUp className="h-4 w-4" />
                        Upload PDF Files
                    </label>
                    <div className="mt-1 flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileUp className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    Multiple PDFs allowed (MAX. {user.uploadLimits.concurrentPapers} files)
                                </p>
                            </div>
                            <input
                                {...register('files', {
                                    required: 'Please upload at least one PDF file',
                                    validate: {
                                        withinLimit: files =>
                                            files.length <= user.uploadLimits.concurrentPapers ||
                                            `Exceeds ${user.tier} tier limit of ${user.uploadLimits.concurrentPapers} files`
                                    }
                                })}
                                type="file"
                                multiple
                                accept="application/pdf"
                                className="hidden"
                            />
                        </label>
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {Array.from(selectedFiles).map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span className="text-sm text-gray-600 flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        {file.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {errors.files && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.files.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-3 rounded-md disabled:opacity-70 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Uploading {progress}%...
                        </>
                    ) : (
                        `Upload ${selectedFiles.length} Paper${selectedFiles.length !== 1 ? 's' : ''}`
                    )}
                </button>
            </form>

            {papers.length > 0 && (
                <div className="mt-6 space-y-4">
                    {papers.map((paper, index) => (
                        <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-md">
                            <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                                {paper.processingProgress === 100 ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                )}
                                Paper #{index + 1} {paper.processingProgress === 100 ? 'Uploaded' : 'Processing'}
                            </div>
                            <p className="mb-1"><span className="font-medium">Title:</span> {paper.title}</p>
                            <div className="mt-2 h-2 bg-green-100 rounded-full">
                                <div
                                    className="h-2 bg-green-500 rounded-full transition-all"
                                    style={{ width: `${paper.processingProgress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadForm;