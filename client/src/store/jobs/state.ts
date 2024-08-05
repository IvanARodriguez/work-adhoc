import { Job } from '../../types/overmind'

type JobState = {
	jobs: Job[]
}

export const state: JobState = {
	jobs: [],
}
