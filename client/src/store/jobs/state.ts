import { Job } from '../../types/overmind'

type JobState = {
	jobs: Job[]
	isLoading: boolean
	jobView: Job
}

export const state: JobState = {
	jobs: [],
	isLoading: true,
	jobView: {
		createdAt: '',
		description: '',
		id: '',
		title: '',
		salary: '',
		overview: '',
		updatedAt: '',
		user: {
			username: '',
		},
		tags: [],
	},
}
