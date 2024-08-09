import { useState } from 'react'
import Layout from '../components/Layout'
import TextEditor from '../components/TextEditor'

function CreateJobPage() {
	const [tags, setTags] = useState<string[]>([])
	const [tagInput, setTagInput] = useState<string>()
	function addTag(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		if (tags.includes(value.replace(',', ''))) {
			setTagInput(value.replace(',', ''))
			return
		}
		if (tags.length === 3) {
			return
		}
		if (value.includes(',')) {
			const newTags = [...tags, value.replace(',', '')]
			setTags(newTags)
			setTagInput('')
			return
		}
		setTagInput(value)
	}
	function removeTag(tag: string) {
		const newTags = tags.filter((t) => t !== tag)
		setTags(newTags)
	}

	return (
		<Layout>
			<div className='container max-w-2xl mx-auto flex flex-col gap-4 p-2'>
				<h1 className='font-semibold text-4xl pt-4'>Create a Job Post</h1>
				<form className='flex flex-col gap-4 p-2'>
					<div className='w-full'>
						<h2 className=' text-2xl text-purple-500'>Title</h2>
						<p className='text-gray-400'>
							Add a job title, this will be helpful for job search
						</p>
						<input
							placeholder='Mid-level Engineer'
							className='rounded w-full order-gray-200 focus:outline-gray-300 bg-gray-100 border-2 p-2'
						/>
					</div>
					<div className='w-full'>
						<h2 className=' text-2xl text-purple-500'>Anual Salary</h2>

						<input
							type='number'
							placeholder='78000'
							className='rounded w-full order-gray-200 focus:outline-gray-300 bg-gray-100 border-2 p-2'
						/>
					</div>
					<div className='w-full'>
						<h2 className=' text-2xl text-purple-500'>Overview</h2>
						<p className='text-gray-400'>
							Write a brief detail about this job opportunity
						</p>
						<textarea
							className='w-full order-gray-200 focus:outline-gray-300 bg-gray-100 border-2 p-2'
							maxLength={250}
							rows={4}
						></textarea>
					</div>
					<div className='w-full'>
						<h2 className=' text-2xl text-purple-500'>Description</h2>
						<p className='text-gray-400'>
							Please include details about the job, such as benefits, ideal
							candidate profile, and whether it is a contract or full-time
							position.
						</p>
						<TextEditor />
					</div>
					<div className='w-full grid gap-2'>
						<h2 className=' text-2xl text-purple-500'>Must have</h2>
						<p className='text-gray-400'>
							Add up to 30 skills, use comma to add a new one
						</p>
						<input
							className='rounded w-full order-gray-200 focus:outline-gray-300 bg-gray-100 border-2 p-2'
							type='text'
							value={tagInput}
							onChange={addTag}
							placeholder='Add Skill'
						/>
						<div className='flex flex-wrap'>
							{tags.map((t) => (
								<span
									id='badge-dismiss-default'
									className='inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-200'
								>
									#{t}
									<button
										type='button'
										className='inline-flex items-center p-1 ms-2 text-sm text-purple-200 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300'
										data-dismiss-target='#badge-dismiss-default'
										aria-label='Remove'
										onClick={() => removeTag(t)}
									>
										<svg
											className='w-2 h-2'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 14 14'
										>
											<path
												stroke='currentColor'
												stroke-linecap='round'
												stroke-linejoin='round'
												stroke-width='2'
												d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
											/>
										</svg>
										<span className='sr-only'>Remove badge</span>
									</button>
								</span>
							))}
						</div>
					</div>
				</form>
			</div>
		</Layout>
	)
}

export default CreateJobPage
