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
		<Layout currentPage='Jobs'>
			<div className='flex flex-col my-6 gap-4'>
				<h1 className='container text-4xl text-center'>Job Opportunities</h1>
				<div className='container mx-auto px-2 justify-center flex flex-wrap  gap-1'>
					{jobs.jobs.map((job) => (
						<JobCard key={job.id} job={job} />
					))}
				</div>
			</div>
		</Layout>
	)
}

export default JobsPage
