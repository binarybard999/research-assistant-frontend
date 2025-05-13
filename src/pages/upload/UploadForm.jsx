import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPaper, resetUpload } from '../../redux/slices/uploadSlice.js';
import { FileUp, Users, FileText, Loader2, Check, AlertCircle, Info, X } from 'lucide-react';

const UploadForm = () => {
    const dispatch = useDispatch();
    const { loading, error, papers, progress, remainingUploads } = useSelector((state) => state.upload);
    const { user } = useSelector((state) => state.auth);

    const [successMessage, setSuccessMessage] = useState('');

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const selectedFiles = watch('files') || [];

    // Reset form and success message when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetUpload());
        };
    }, [dispatch]);

    // Show success message when upload completes
    useEffect(() => {
        if (papers.length > 0 && papers.every(paper => paper.processingProgress === 100)) {
            setSuccessMessage('All papers successfully uploaded!');
            // Reset form after successful upload
            setTimeout(() => {
                reset();
                dispatch(resetUpload());
                setSuccessMessage('');
            }, 3000);
        }
    }, [papers, dispatch, reset]);

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

    const removeFile = (index) => {
        const dataTransfer = new DataTransfer();

        Array.from(selectedFiles)
            .filter((_, i) => i !== index)
            .forEach(file => {
                dataTransfer.items.add(file);
            });

        const input = document.querySelector('input[type="file"]');
        input.files = dataTransfer.files;

        // Trigger change event
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
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

            <div className="p-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
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

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <p className="text-green-700 font-medium">{successMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Title</label>
                            <input
                                {...register('title', { required: 'Title is required' })}
                                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
                                className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                placeholder="Author names (comma separated)"
                            />
                            {errors.authors && (
                                <p className="mt-1 text-sm text-red-600">{errors.authors.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Abstract</label>
                        <textarea
                            {...register('abstract')}
                            className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            rows="3"
                            placeholder="Provide a brief abstract of your paper"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                            <FileUp className="h-4 w-4" />
                            Upload PDF Files
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                    <FileUp className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Multiple PDFs (MAX. {user.uploadLimits.concurrentPapers} files)
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
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Array.from(selectedFiles).map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                                        <span className="text-sm text-gray-600 flex items-center gap-2 truncate">
                                            <FileText className="h-4 w-4 flex-shrink-0" />
                                            <span className="truncate">{file.name}</span>
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
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
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-2.5 rounded-md disabled:opacity-70 flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                Uploading {progress}%...
                            </>
                        ) : (
                            `Upload ${selectedFiles.length > 0 ? selectedFiles.length : 0} Paper${selectedFiles.length !== 1 ? 's' : ''}`
                        )}
                    </button>
                </form>

                {papers.length > 0 && (
                    <div className="mt-6 space-y-3">
                        <h3 className="font-medium text-gray-700">Upload Status</h3>
                        {papers.map((paper, index) => (
                            <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-md">
                                <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                                    {paper.processingProgress === 100 ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    )}
                                    Paper #{index + 1} {paper.processingProgress === 100 ? 'Uploaded' : 'Processing'}
                                </div>
                                <p className="text-sm"><span className="font-medium">Title:</span> {paper.title}</p>
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
        </div>
    );
};

export default UploadForm;