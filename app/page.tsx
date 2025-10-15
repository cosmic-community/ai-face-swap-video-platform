import { VideoProject } from '@/types'
import Header from '@/components/Header'
import AnnouncementBanner from '@/components/AnnouncementBanner'
import UploadSection from '@/components/UploadSection'
import ProjectsList from '@/components/ProjectsList'
import StatsCards from '@/components/StatsCards'

export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    getSettings(),
    getVideoProjects()
  ])
  
  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Settings not configured. Please set up your Cosmic bucket.</p>
      </div>
    )
  }
  
  const pendingCount = projects.filter((p: VideoProject) => p.metadata?.processing_status?.key === 'pending').length
  const processingCount = projects.filter((p: VideoProject) => p.metadata?.processing_status?.key === 'processing').length
  const completedCount = projects.filter((p: VideoProject) => p.metadata?.processing_status?.key === 'completed').length
  
  return (
    <div className="min-h-screen">
      <Header settings={settings} />
      
      {settings.metadata?.announcement && (
        <AnnouncementBanner announcement={settings.metadata.announcement} />
      )}
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Face Swap Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your video, detect faces automatically, and swap them with your chosen targets - all completely free!
            </p>
          </section>
          
          <StatsCards 
            pending={pendingCount}
            processing={processingCount}
            completed={completedCount}
          />
          
          <UploadSection settings={settings} />
          
          <ProjectsList projects={projects} />
        </div>
      </main>
    </div>
  )
}