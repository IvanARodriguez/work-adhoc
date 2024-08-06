import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
function HomePage() {
	return (
		<Layout currentPage='Home'>
			<section className='bg-white min-h-full '>
				<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-24'>
					<h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black'>
						We let job seekers know
					</h1>
					<p className='mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-600'>
						This platform provides access to a wide variety of job
						opportunities, ensuring that you find the right fit for your skills
						and aspirations.
					</p>
					<div className='flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0'>
						<Link
							to='/jobs/create'
							className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
						>
							Post a Job
							<svg
								className='w-3.5 h-3.5 ms-2 rtl:rotate-180'
								aria-hidden={true}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 14 10'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M1 5h12m0 0L9 1m4 4L9 9'
								/>
							</svg>
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default HomePage
