'use client'

import { useState } from 'react'
import { VideoProject, ProcessingStatus } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectsListProps {
  projects: VideoProject[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [filterStatus, setFilterStatus] = useState<ProcessingStatus | 'all'>('all')
  
  const filteredProjects = filterStatus === 'all' 
    ? projects 
    : projects.filter(p => p.metadata?.processing_status?.key === filterStatus)
  
  const statusOptions: Array<{ value: ProcessingStatus | 'all', label: string }> = [
    { value: 'all', label: 'All Projects' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' }
  ]
  
  return (
    <section className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as ProcessingStatus | 'all')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📹</div>
          <p className="text-gray-600">No projects found</p>
          <p className="text-sm text-gray-500 mt-2">Upload a video to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}