import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Instructores'
}

export default function Page({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item) query.append(key, item)
      }
      continue
    }

    if (value) query.set(key, value)
  }

  query.set('consultant_category', 'Instructores')

  const queryString = query.toString()
  redirect(queryString ? `/directorio?${queryString}` : '/directorio')
}
