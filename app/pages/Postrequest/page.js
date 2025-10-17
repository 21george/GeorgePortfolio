'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ image: 0, video: 0 });
  
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    projectNumber: '',
    description: '',
    fullDescription: '',
    imageUrl: '',
    videoUrl: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    category: 'Web Development',
    status: 'active',
    featured: false,
    order: 0
  });

  const [mediaFiles, setMediaFiles] = useState({
    imageFile: null,
    videoFile: null,
    imagePreview: null,
    videoPreview: null
  });

  const categories = [
    'Web Development',
    'Mobile Development', 
    'AI/ML',
    'Desktop Application',
    'Other'
  ];

  const statusOptions = [
    'active',
    'completed',
    'archived'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size should be less than 5MB');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setMediaFiles(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: previewUrl
      }));
      
      // Clear URL input if file is selected
      setFormData(prev => ({ ...prev, imageUrl: '' }));
      setError(null);
    }
  };

  // Handle video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }
      
      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setError('Video file size should be less than 100MB');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setMediaFiles(prev => ({
        ...prev,
        videoFile: file,
        videoPreview: previewUrl
      }));
      
      // Clear URL input if file is selected
      setFormData(prev => ({ ...prev, videoUrl: '' }));
      setError(null);
    }
  };

  // Upload file to Cloudinary or your preferred service
  const uploadFileToCloudinary = async (file, resourceType = 'auto') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
    formData.append('resource_type', resourceType);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/${resourceType}/upload`, // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  // Alternative: Upload to your own server
  const uploadFileToServer = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  // Upload file with progress tracking
  const uploadFileWithProgress = async (file, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Simulate progress for user feedback
        let progress = 0;
        const progressInterval = setInterval(() => {
          progress += Math.random() * 20;
          if (progress > 90) progress = 90;
          setUploadProgress(prev => ({ ...prev, [type]: Math.min(progress, 90) }));
        }, 500);

        // Choose your upload method:
        // Option 1: Cloudinary (recommended for production)
        // const url = await uploadFileToCloudinary(file, type === 'video' ? 'video' : 'image');
        
        // Option 2: Your own server
        const url = await uploadFileToServer(file, type);
        
        // Complete progress
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [type]: 100 }));
        
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, [type]: 0 }));
          resolve(url);
        }, 500);
        
      } catch (error) {
        setUploadProgress(prev => ({ ...prev, [type]: 0 }));
        reject(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let processedData = { ...formData };

      // Upload image file if selected
      if (mediaFiles.imageFile) {
        try {
          const imageUrl = await uploadFileWithProgress(mediaFiles.imageFile, 'image');
          processedData.imageUrl = imageUrl;
        } catch (error) {
          setError('Failed to upload image. Please try again.');
          setLoading(false);
          return;
        }
      }

      // Upload video file if selected
      if (mediaFiles.videoFile) {
        try {
          const videoUrl = await uploadFileWithProgress(mediaFiles.videoFile, 'video');
          processedData.videoUrl = videoUrl;
        } catch (error) {
          setError('Failed to upload video. Please try again.');
          setLoading(false);
          return;
        }
      }

      // Process technologies array
      processedData = {
        ...processedData,
        technologies: formData.technologies
          .split(',')
          .map(tech => tech.trim())
          .filter(tech => tech.length > 0),
        order: parseInt(formData.order) || 0
      };

      // Send to your API
      const response = await fetch('/api/Project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: '',
          projectNumber: '',
          description: '',
          fullDescription: '',
          imageUrl: '',
          videoUrl: '',
          technologies: '',
          liveUrl: '',
          githubUrl: '',
          category: 'Web Development',
          status: 'active',
          featured: false,
          order: 0
        });
        setMediaFiles({
          imageFile: null,
          videoFile: null,
          imagePreview: null,
          videoPreview: null
        });
        
        // Reset file inputs
        if (imageInputRef.current) imageInputRef.current.value = '';
        if (videoInputRef.current) videoInputRef.current.value = '';
        
        // Redirect to projects page after 3 seconds
        setTimeout(() => {
          router.push('/pages/Projects');
        }, 3000);
      } else {
        setError(result.error || 'Failed to create project');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error creating project:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setMediaFiles(prev => ({ ...prev, imageFile: null, imagePreview: null }));
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // Remove video
  const removeVideo = () => {
    setMediaFiles(prev => ({ ...prev, videoFile: null, videoPreview: null }));
    setFormData(prev => ({ ...prev, videoUrl: '' }));
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Add New Project
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <strong>Success!</strong> Project created successfully. Redirecting to projects page...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label htmlFor="projectNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Number *
                </label>
                <input
                  type="text"
                  id="projectNumber"
                  name="projectNumber"
                  value={formData.projectNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., PRJ-001"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description * (Max 200 characters)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                maxLength={200}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Brief description of the project"
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.description.length}/200 characters
              </div>
            </div>

            {/* Full Description */}
            <div>
              <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Description * (Max 1000 characters)
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                required
                maxLength={1000}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Detailed description of the project"
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.fullDescription.length}/1000 characters
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="space-y-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Project Media
              </h3>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Image
                </label>
                
                {/* Image Upload Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Upload Image File (Max 5MB)</label>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {uploadProgress.image > 0 && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress.image}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadProgress.image < 100 ? `Uploading: ${Math.round(uploadProgress.image)}%` : 'Upload complete!'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Or Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      disabled={!!mediaFiles.imageFile}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {(mediaFiles.imagePreview || formData.imageUrl) && (
                  <div className="mt-4 relative">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                      <Image
                        src={mediaFiles.imagePreview || formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Video
                </label>
                
                {/* Video Upload Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Upload Video File (Max 100MB)</label>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    {uploadProgress.video > 0 && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress.video}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadProgress.video < 100 ? `Uploading video: ${Math.round(uploadProgress.video)}%` : 'Video upload complete!'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-2">Or Video URL</label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                      disabled={!!mediaFiles.videoFile}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                </div>

                {/* Video Preview */}
                {(mediaFiles.videoPreview || formData.videoUrl) && (
                  <div className="mt-4 relative">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                      <video
                        src={mediaFiles.videoPreview || formData.videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeVideo}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies (comma-separated) *
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="React, Next.js, MongoDB, Tailwind CSS"
              />
              <div className="text-sm text-gray-500 mt-1">
                Separate technologies with commas
              </div>
            </div>

            {/* Project Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://project-demo.com"
                />
              </div>

              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Featured Project
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating Project...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}