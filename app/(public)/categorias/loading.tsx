import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Skeleton className="h-9 w-44" />
      <Skeleton className="mt-4 h-5 w-80 max-w-full" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-[1.6rem]" />
        ))}
      </div>
    </div>
  )
}
