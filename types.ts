// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Settings type
export interface Settings extends CosmicObject {
  type: 'settings'
  metadata: {
    max_file_size: number
    max_duration: number
    service_enabled: boolean
    announcement?: string
    supported_formats?: string
  }
}

// Video project type with proper status literals
export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface VideoFile {
  url: string
  imgix_url: string
}

export interface VideoProject extends CosmicObject {
  type: 'video-projects'
  metadata: {
    project_title: string
    description?: string
    original_video?: VideoFile
    result_video?: VideoFile
    processing_status: {
      key: ProcessingStatus
      value: string
    }
    video_duration?: number
    file_size?: number
    error_message?: string
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Face detection types for the face swap feature
export interface DetectedFace {
  id: string
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
  confidence: number
  thumbnail?: string
}

export interface FaceSwapSelection {
  sourceFaceId: string
  targetFaceId: string
}

// Form data types
export interface CreateProjectFormData {
  project_title: string
  description?: string
  video_file: File
}

// Type guards
export function isVideoProject(obj: CosmicObject): obj is VideoProject {
  return obj.type === 'video-projects'
}

export function isSettings(obj: CosmicObject): obj is Settings {
  return obj.type === 'settings'
}