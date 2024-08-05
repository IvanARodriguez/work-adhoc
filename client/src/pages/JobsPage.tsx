import { useEffect } from 'react'
import Layout from '../components/Layout'
import { useActions, useState } from '../store'
import JobCard from '../components/JobCard'

function JobsPage() {
	const actions = useActions()
	const { jobs } = useState()
	useEffect(() => {
		actions.jobs.getJobs()
	}, [])

	return (
		<Layout>
			<div className='flex flex-wrap justify-center'>
				{jobs.jobs.map((job) => (
					<JobCard key={job.id} job={job} />
				))}
			</div>
		</Layout>
	)
}

export default JobsPage
