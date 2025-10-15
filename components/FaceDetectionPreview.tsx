'use client'

import { useState, useEffect } from 'react'
import { DetectedFace } from '@/types'

interface FaceDetectionPreviewProps {
  videoUrl: string
  onFacesDetected: (faces: DetectedFace[]) => void
}

export default function FaceDetectionPreview({ videoUrl, onFacesDetected }: FaceDetectionPreviewProps) {
  const [isDetecting, setIsDetecting] = useState(true)
  const [detectedFaces, setDetectedFaces] = useState<DetectedFace[]>([])
  
  useEffect(() => {
    // Simulate face detection
    // In a real implementation, this would call an AI face detection API
    const simulateDetection = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockFaces: DetectedFace[] = [
        {
          id: 'face-1',
          boundingBox: { x: 100, y: 50, width: 80, height: 100 },
          confidence: 0.95
        },
        {
          id: 'face-2',
          boundingBox: { x: 250, y: 70, width: 85, height: 105 },
          confidence: 0.92
        },
        {
          id: 'face-3',
          boundingBox: { x: 400, y: 60, width: 75, height: 95 },
          confidence: 0.88
        }
      ]
      
      setDetectedFaces(mockFaces)
      setIsDetecting(false)
      onFacesDetected(mockFaces)
    }
    
    simulateDetection()
  }, [videoUrl, onFacesDetected])
  
  if (isDetecting) {
    return (
      <div className="border border-gray-200 rounded-lg p-8 bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div>
            <p className="font-medium text-gray-900">Detecting Faces...</p>
            <p className="text-sm text-gray-600">AI is analyzing your video to identify faces</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
      <h3 className="font-semibold text-gray-900 mb-4">
        ✓ Detected {detectedFaces.length} face{detectedFaces.length !== 1 ? 's' : ''}
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        {detectedFaces.map((face) => (
          <div key={face.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Face {face.id.split('-')[1]}</p>
            <p className="text-xs text-gray-500">Confidence: {(face.confidence * 100).toFixed(1)}%</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-medium">Next Step:</span> After creating the project, you'll be able to select which faces to swap
        </p>
      </div>
    </div>
  )
}