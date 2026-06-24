import type { ProblemDetails } from '@/lib/api/contracts'

export class ApiError extends Error {
  constructor(public problem: ProblemDetails) {
    super(problem.detail || problem.title)
    this.name = 'ApiError'
  }

  get status() {
    return this.problem.status
  }
}

export async function parseProblemDetails(response: Response): Promise<ProblemDetails> {
  try {
    return (await response.json()) as ProblemDetails
  } catch {
    return {
      type: 'about:blank',
      title: response.statusText || 'Request failed',
      status: response.status,
      detail: 'No fue posible interpretar la respuesta del backend.',
      instance: '',
      request_id: null,
      timestamp: new Date().toISOString()
    }
  }
}

