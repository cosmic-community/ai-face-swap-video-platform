import { createBucketClient } from '@cosmicjs/sdk'
import { VideoProject } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Get app settings
export async function getSettings() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'settings',
        slug: 'app-settings'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch settings')
  }
}

// Get all video projects
// Get all video projects
export async function getVideoProjects(): Promise<VideoProject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'video-projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as VideoProject[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch video projects')
  }
}

// Get project by ID
export async function getProjectById(id: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        id
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch project')
  }
}

// Create new video project
export async function createVideoProject(data: {
  title: string
  description?: string
  video_duration?: number
  file_size?: number
}) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'video-projects',
      title: data.title,
      metadata: {
        project_title: data.title,
        description: data.description || '',
        processing_status: 'pending',
        video_duration: data.video_duration,
        file_size: data.file_size,
        error_message: ''
      }
    })
    
    return response.object
  } catch (error) {
    console.error('Error creating project:', error)
    throw new Error('Failed to create project')
  }
}

// Update project status
export async function updateProjectStatus(
  id: string,
  status: 'pending' | 'processing' | 'completed' | 'failed',
  errorMessage?: string
) {
  try {
    const updateData: any = {
      metadata: {
        processing_status: status
      }
    }
    
    if (errorMessage) {
      updateData.metadata.error_message = errorMessage
    }
    
    const response = await cosmic.objects.updateOne(id, updateData)
    return response.object
  } catch (error) {
    console.error('Error updating project status:', error)
    throw new Error('Failed to update project status')
  }
}