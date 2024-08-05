import { createErrorResponse } from '../helpers/errorResponse'
import { Job } from '../types/overmind'

export type CustomResponse = {
	message: string
}

export async function getAuthStatus() {
	const res = await fetch('/api/validate')
	if (!res.ok) {
		return createErrorResponse(res)
	}
	const json = (await res.json()) as CustomResponse
	return json
}

export async function getJobs() {
	const result = await fetch('/api/jobs')

	if (!result.ok) {
		return createErrorResponse(result)
	}

	const jobs: { jobs: Job[] } = await result.json()
	return jobs
}
