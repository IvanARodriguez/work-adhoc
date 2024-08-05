import moment from 'moment'
import { truncateText } from '../helpers/textHelper'
import { Job } from '../types/overmind'
import { Link } from 'react-router-dom'

function JobCard({ job }: { job: Job }) {
	const truncatedDescription = truncateText(job.overview, 300)
	const truncatedTitle = truncateText(job.title, 40)
	const { tags } = job
	return (
		<Link
			to={`/jobs/${job.id}`}
			className='max-w-xl  p-4 hover:bg-gray-100 rounded shadow-lg bg-white w-full grid  gap-2 '
			style={{ gridTemplateRows: '1fr auto' }}
		>
			<div className=''>
				<div className='font-bold text-xl mb-2'>{truncatedTitle}</div>
				<p className='text-gray-700 text-base '>{truncatedDescription}</p>
				<p className='text-gray-900 font-semibold mt-2'>Salary: {job.salary}</p>
				<p className='text-gray-600 text-sm'>Posted by: {job.user.username}</p>
				<p>{moment(new Date(job.createdAt)).fromNow()}</p>
			</div>
			<div className='*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-600 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 flex gap-2 text-xs h-fit'>
				{tags.map((tag) => (
					<span
						key={tag.id}
						// className=' bg-purple-300 rounded-full px-2 py-1 text-xs font-semibold text-black '
					>
						#{tag.name}
					</span>
				))}
			</div>
		</Link>
	)
}

export default JobCard
