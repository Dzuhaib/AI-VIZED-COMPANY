export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-teal/20 border-t-teal animate-spin" />
        <p className="font-body text-soft-white/30 text-sm">Loading...</p>
      </div>
    </div>
  )
}
