interface StatsCardsProps {
  pending: number
  processing: number
  completed: number
}

export default function StatsCards({ pending, processing, completed }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">⏱️</span>
          </div>
          <div>
            <p className="text-sm text-yellow-700 font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-900">{pending}</p>
          </div>
        </div>
      </div>
      
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">⚙️</span>
          </div>
          <div>
            <p className="text-sm text-blue-700 font-medium">Processing</p>
            <p className="text-3xl font-bold text-blue-900">{processing}</p>
          </div>
        </div>
      </div>
      
      <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <div>
            <p className="text-sm text-green-700 font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-900">{completed}</p>
          </div>
        </div>
      </div>
    </div>
  )
}