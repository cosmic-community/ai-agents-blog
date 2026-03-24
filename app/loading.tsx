export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-slate-700"></div>
          <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-accent-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm text-gray-400 dark:text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  )
}