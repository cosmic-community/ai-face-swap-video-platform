import { VideoProject } from '@/types'

interface ProjectCardProps {
  project: VideoProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { metadata } = project
  const status = metadata?.processing_status?.key || 'pending'
  const statusValue = metadata?.processing_status?.value || 'Pending'
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    processing: 'bg-blue-100 text-blue-700 border-blue-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
    failed: 'bg-red-100 text-red-700 border-red-200'
  }
  
  const statusIcons = {
    pending: '⏱️',
    processing: '⚙️',
    completed: '✓',
    failed: '✗'
  }
  
  return (
    <div className="card hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden">
          {metadata?.original_video?.imgix_url ? (
            <img
              src={`${metadata.original_video.imgix_url}?w=400&h=225&fit=crop&auto=format,compress`}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{metadata?.project_title || project.title}</h3>
          {metadata?.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{metadata.description}</p>
          )}
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${statusColors[status]}`}>
          <span>{statusIcons[status]}</span>
          <span>{statusValue}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          {metadata?.video_duration && (
            <div>
              <span className="font-medium">Duration:</span> {Math.floor(metadata.video_duration / 60)}:{(metadata.video_duration % 60).toString().padStart(2, '0')}
            </div>
          )}
          {metadata?.file_size && (
            <div>
              <span className="font-medium">Size:</span> {metadata.file_size} MB
            </div>
          )}
        </div>
        
        {metadata?.error_message && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
            {metadata.error_message}
          </div>
        )}
        
        {status === 'completed' && metadata?.result_video?.imgix_url && (
          <a
            href={metadata.result_video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center text-sm"
          >
            Download Result
          </a>
        )}
      </div>
    </div>
  )
}