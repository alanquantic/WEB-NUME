'use client'

import type { ComponentProps, FormEvent } from 'react'

type AutoSubmitFormProps = ComponentProps<'form'>

export function AutoSubmitForm({ children, onChange, ...props }: AutoSubmitFormProps) {
  function handleChange(event: FormEvent<HTMLFormElement>) {
    onChange?.(event)

    if (event.defaultPrevented) return
    if (!(event.target instanceof HTMLSelectElement)) return

    event.currentTarget.requestSubmit()
  }

  return (
    <form {...props} onChange={handleChange}>
      {children}
    </form>
  )
}
