import { Settings } from '@/types'

interface HeaderProps {
  settings: Settings
}

export default function Header({ settings }: HeaderProps) {
  const { max_file_size, max_duration, service_enabled } = settings.metadata
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎭</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Face Swap AI</h1>
              <p className="text-sm text-gray-500">Free & Unlimited</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Max Size:</span>
              <span className="font-semibold text-gray-900">{max_file_size} MB</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Max Duration:</span>
              <span className="font-semibold text-gray-900">{max_duration} min</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              service_enabled 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {service_enabled ? '✓ Active' : '✗ Inactive'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}