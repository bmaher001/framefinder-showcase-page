export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-ff-xs bg-elevated ${className}`} aria-hidden="true" />
}
