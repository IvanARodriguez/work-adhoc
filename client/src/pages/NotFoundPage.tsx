import { Link } from 'react-router-dom'

function NotFoundPage() {
	return (
		<div className='w-full min-h-screen bg-gray-100 flex flex-wrap-reverse flex-col justify-center items-center'>
			<div className='flex flex-wrap w-full'>
				<img src='/not-found.webp' w-auto alt='Not found image' />
				<div className='flex flex-col justify-center items-center w-full'>
					<h1 className='text-9xl font-bold text-gray-800'>404</h1>
					<p className='text-xl text-gray-600 mt-4'>Page Not Found</p>
					<Link
						to='/'
						className='mt-6 px-4 py-2 d-block bg-blue-500 text-white rounded hover:bg-blue-600'
					>
						Go Home
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFoundPage
