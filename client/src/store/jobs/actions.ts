import { Context } from '..'
import { isErrorResponse } from '../../helpers/errorResponse'

export async function getJobs({ state, effects }: Context) {
	const response = await effects.jobs.getJobs()

	if (isErrorResponse(response)) {
		const m = await response.result.json()
		console.log(m.message)
		return
	}

	state.jobs.jobs = response.jobs
}
