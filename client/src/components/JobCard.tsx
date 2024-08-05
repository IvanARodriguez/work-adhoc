import { truncateText } from '../helpers/textHelper'
import { Job } from '../types/overmind'

function JobCard({ job }: { job: Job }) {
	const truncatedDescription = truncateText(job.description, 100)
	return (
		<div className='max-w-sm rounded overflow-hidden shadow-lg bg-white m-4'>
			<div className='px-6 py-4'>
				<div className='font-bold text-xl mb-2'>{job.title}</div>
				<p className='text-gray-700 text-base'>{truncatedDescription}</p>
				<p className='text-gray-900 font-semibold mt-2'>Salary: {job.salary}</p>
				<p className='text-gray-600 text-sm'>Posted by: {job.user.username}</p>
			</div>
			<div className='px-6 pt-4 pb-2'>
				<span className='inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2'>
					#Software
				</span>
				<span className='inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2'>
					#Developer
				</span>
			</div>
		</div>
	)
}

export default JobCard
