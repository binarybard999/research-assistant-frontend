import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPaper } from '../../redux/slices/uploadSlice.js';
import { FileUp, Users, FileText, Loader2, Check, AlertCircle } from 'lucide-react';

const UploadForm = () => {
    const dispatch = useDispatch();
    const { loading, error, paper } = useSelector((state) => state.upload);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            title: '',
            authors: '',
            abstract: '',
        }
    });

    const selectedFile = watch('file')?.[0];

    const onSubmit = (data) => {
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('authors', data.authors);
        formData.append('abstract', data.abstract);
        formData.append('file', selectedFile);

        dispatch(uploadPaper(formData));
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Upload Research Paper
            </h2>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <p className="text-red-700">{error}</p>
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
                        Upload PDF File
                    </label>
                    <div className="mt-1 flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileUp className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PDF only (MAX. 10MB)</p>
                            </div>
                            <input
                                {...register('file', { required: 'Please upload a PDF file' })}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                            />
                        </label>
                    </div>
                    {selectedFile && (
                        <p className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                            <Check className="h-4 w-4 text-green-500" />
                            {selectedFile.name}
                        </p>
                    )}
                    {errors.file && (
                        <p className="mt-1 text-sm text-red-600">{errors.file.message}</p>
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
                            Uploading...
                        </>
                    ) : (
                        'Submit Paper'
                    )}
                </button>
            </form>

            {paper && (
                <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                        <Check className="h-5 w-5" />
                        Paper Uploaded Successfully
                    </div>
                    <p className="mb-1"><span className="font-medium">Title:</span> {paper.title}</p>
                    <p className="mb-1"><span className="font-medium">Authors:</span> {paper.authors}</p>
                    <p className="text-sm text-green-600 mt-2">Your submission is now being processed</p>
                </div>
            )}
        </div>
    );
};

export default UploadForm;