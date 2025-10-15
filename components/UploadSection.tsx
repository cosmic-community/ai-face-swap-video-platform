'use client'

import { useState } from 'react'
import { Settings } from '@/types'
import FaceDetectionPreview from './FaceDetectionPreview'

interface UploadSectionProps {
  settings: Settings
}

export default function UploadSection({ settings }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadStep, setUploadStep] = useState<'upload' | 'detect' | 'select' | 'process'>('upload')
  const [projectTitle, setProjectTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  
  const { max_file_size, max_duration, supported_formats } = settings.metadata
  const formatsArray = supported_formats?.split(',').map(f => f.trim()) || []
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > max_file_size) {
      alert(`File size exceeds ${max_file_size} MB limit`)
      return
    }
    
    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (fileExtension && !formatsArray.some(format => format.toLowerCase() === fileExtension)) {
      alert(`File format not supported. Supported formats: ${supported_formats}`)
      return
    }
    
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setUploadStep('detect')
  }
  
  const handleUpload = async () => {
    if (!selectedFile || !projectTitle) {
      alert('Please provide a project title')
      return
    }
    
    setIsUploading(true)
    
    try {
      // In a real implementation, this would:
      // 1. Upload the video to Cosmic
      // 2. Trigger face detection
      // 3. Create the project record
      
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('title', projectTitle)
      formData.append('description', description)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Project created successfully! Face detection will begin shortly.')
      
      // Reset form
      setSelectedFile(null)
      setPreviewUrl(null)
      setProjectTitle('')
      setDescription('')
      setUploadStep('upload')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to create project')
    } finally {
      setIsUploading(false)
    }
  }
  
  return (
    <section className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Video</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter project name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter project description"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video File
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <input
              type="file"
              accept={formatsArray.map(f => `.${f}`).join(',')}
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <div className="space-y-2">
                <div className="text-4xl">📹</div>
                <div className="text-gray-600">
                  {selectedFile ? (
                    <span className="font-medium text-primary">{selectedFile.name}</span>
                  ) : (
                    <>
                      <span className="font-medium text-primary">Click to upload</span> or drag and drop
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Supported formats: {supported_formats}
                  <br />
                  Max size: {max_file_size} MB | Max duration: {max_duration} minutes
                </div>
              </div>
            </label>
          </div>
        </div>
        
        {previewUrl && uploadStep === 'detect' && (
          <FaceDetectionPreview 
            videoUrl={previewUrl}
            onFacesDetected={() => setUploadStep('select')}
          />
        )}
        
        <div className="flex gap-4">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !projectTitle || isUploading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Creating Project...' : 'Create Project & Detect Faces'}
          </button>
          
          {selectedFile && (
            <button
              onClick={() => {
                setSelectedFile(null)
                setPreviewUrl(null)
                setUploadStep('upload')
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </section>
  )
}