import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Skeleton className="h-9 w-32" />
      <Skeleton className="mt-4 h-5 w-80 max-w-full" />
      <div className="mt-8 flex flex-wrap gap-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-28 rounded-full" />
        ))}
      </div>
    </div>
  )
}
