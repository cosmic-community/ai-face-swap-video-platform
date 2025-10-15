'use client'

interface AnnouncementBannerProps {
  announcement: string
}

export default function AnnouncementBanner({ announcement }: AnnouncementBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-3">
      <div className="container mx-auto px-4">
        <div 
          className="text-white text-center"
          dangerouslySetInnerHTML={{ __html: announcement }}
        />
      </div>
    </div>
  )
}