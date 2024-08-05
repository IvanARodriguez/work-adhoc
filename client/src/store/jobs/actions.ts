import { Context } from '..'
import { isErrorResponse } from '../../helpers/errorResponse'

export async function getJobs({ state, effects }: Context) {
	state.jobs.isLoading = true
	const response = await effects.jobs.getJobs()

	if (isErrorResponse(response)) {
		state.jobs.isLoading = false
		const m = await response.result.json()
		console.log(m.message)
		return
	}
	state.jobs.isLoading = false
	state.jobs.jobs = response.jobs
}
export async function getJobWithId({ state, effects }: Context, id: string) {
	state.jobs.isLoading = true
	const response = await effects.jobs.getJobById(id)

	if (isErrorResponse(response)) {
		state.jobs.isLoading = false
		const m = await response.result.json()
		console.log(m.message)
		return
	}
	state.jobs.isLoading = false

	state.jobs.jobView = response
}
