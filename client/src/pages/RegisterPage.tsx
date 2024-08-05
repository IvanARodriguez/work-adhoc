import Layout from '../components/Layout'
import { useState } from '../store'
import { Link, Navigate } from 'react-router-dom'

function RegisterPage() {
	const { users } = useState()
	if (users.isAuthenticated) return <Navigate to={'/'} />
	return (
		<Layout>
			<div className='flex items-center justify-center min-h-full  login-screen'>
				<div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
					<h2 className='text-3xl font-bold text-center text-gray-900'>
						Create an account
					</h2>
					<form className='max-w-sm mx-auto'>
						<div className='mb-5'>
							<label
								htmlFor='email'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								autoComplete='off'
								className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
								placeholder='name@workadhoc.com'
								required
							/>
						</div>
						<div className='mb-5'>
							<label
								htmlFor='username'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
							>
								Username
							</label>
							<input
								type='username'
								id='username'
								autoComplete='off'
								className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
								placeholder='myjobalias'
								required
							/>
						</div>
						<div className='mb-5'>
							<label
								htmlFor='password'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
							>
								Password
							</label>
							<input
								type='password'
								id='password'
								autoComplete='off'
								className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
								required
							/>
						</div>
						<div className='mb-5'>
							<label
								htmlFor='repeat-password'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
							>
								Repeat Password
							</label>
							<input
								type='password'
								id='repeat-password'
								autoComplete='off'
								className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
								required
							/>
						</div>
						<div className='flex items-start mb-5'>
							<div className='flex items-center h-5'>
								<input
									id='terms'
									type='checkbox'
									value=''
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
									required
								/>
							</div>
							<label
								htmlFor='terms'
								className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-500'
							>
								I agree with the{' '}
								<Link
									to='/'
									className='text-blue-600 hover:underline dark:text-blue-500'
								>
									terms and conditions
								</Link>
							</label>
						</div>
						<button
							type='submit'
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						>
							Register Account
						</button>
					</form>
				</div>
			</div>
		</Layout>
	)
}

export default RegisterPage
