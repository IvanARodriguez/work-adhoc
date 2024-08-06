import Layout from '../components/Layout'
import TextEditor from '../components/TextEditor'

function CreateJobPage() {
	return (
		<Layout>
			<div className='container max-w-2xl mx-auto flex flex-col gap-4'>
				<div className='w-full'>
					<h2 className=' text-2xl text-gray-500'>Title</h2>
					<p>Add a job title, this will be helpful for job search</p>
					<input
						placeholder='Mid-level Engineer'
						className='w-full order-gray-200 focus:outline-gray-300 bg-gray-100 border-2 p-2'
					/>
				</div>
				<div className='w-full'>
					<h2 className=' text-2xl text-gray-500'>Overview</h2>
					<textarea
						className='w-full order-gray-200 focus:outline-gray-300 bg-gray-100 border-2 p-2'
						maxLength={250}
						rows={4}
					></textarea>
				</div>
				<div className='w-full'>
					<h2 className=' text-2xl text-gray-500'>Deatils</h2>
					<TextEditor />
				</div>
			</div>
		</Layout>
	)
}

export default CreateJobPage
