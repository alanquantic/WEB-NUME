import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Skeleton className="h-9 w-40" />
      <Skeleton className="mt-4 h-5 w-80 max-w-full" />
      <Skeleton className="mt-8 h-64 w-full rounded-[1.9rem]" />
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-72 rounded-[1.9rem]" />
        ))}
      </div>
    </div>
  )
}
