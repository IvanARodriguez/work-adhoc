import { useEffect, useLayoutEffect } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { useActions, useState } from '../store'
import Loader from '../components/Loader'

function JobView() {
	const { id } = useParams()
	const actions = useActions()
	const { jobs } = useState()

	useLayoutEffect(() => {
		id && actions.jobs.getJobWithId(id)
	}, [])

	return (
		<Layout>
			{jobs.isLoading ? (
				<Loader />
			) : (
				<div className='max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg my-6 grid gap-4'>
					<h2 className='text-3xl font-semibold'>{jobs.jobView.title}</h2>
					<p className='text-lg text-gray-500'>Salary: {jobs.jobView.salary}</p>
					<h3 className='text-2xl'>Overview</h3>
					<p className='text-gray-600 mb-4'>{jobs.jobView.overview}</p>
					<h3 className='text-2xl'>Description</h3>
					<p className='text-gray-700 mb-4'>{jobs.jobView.description}</p>
					<h3>Must Know</h3>
					<div className='mb-4'>
						{jobs.jobView.tags.map((tag) => (
							<span
								key={tag.id}
								className='inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full'
							>
								#{tag.name}
							</span>
						))}
					</div>
					<div className='text-gray-500 text-sm'>
						Posted by @{jobs.jobView.user.username} on{' '}
						{new Date(jobs.jobView.createdAt).toLocaleDateString()}
					</div>
				</div>
			)}
		</Layout>
	)
}

export default JobView
