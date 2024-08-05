import { createErrorResponse } from '../helpers/errorResponse'
import { Job, User } from '../types/overmind'

export type CustomResponse = {
	message: string
}

export async function getJobById(id: string) {
	const res = await fetch(`/api/jobs/${id}`)
	if (!res.ok) {
		return createErrorResponse(res)
	}
	const job: Job = await res.json()
	return job
}

export async function getJobs() {
	const result = await fetch('/api/jobs')

	if (!result.ok) {
		return createErrorResponse(result)
	}

	const jobs: { jobs: Job[] } = await result.json()
	return jobs
}

export async function login(credentials: {
	username: string
	password: string
}) {
	const result = await fetch('/api/users/login', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})

	if (!result.ok) {
		return createErrorResponse(result)
	}

	const user: User = await result.json()
	return user
}
export async function logout() {
	const result = await fetch('/api/users/logout')

	if (!result.ok) {
		return createErrorResponse(result)
	}

	return ''
}

type ValidationResponse = {
	isAuthenticated: boolean
	message: string
	user: User
}

export async function confirmAuthentication() {
	const res = await fetch('/api/validate')

	if (!res.ok) {
		return createErrorResponse(res)
	}

	const validation: ValidationResponse = await res.json()

	return validation
}
