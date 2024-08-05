import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		console.log('Email:', email, 'Password:', password)
	}
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 login-screen'>
			<div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
				<h2 className='text-2xl font-bold text-center text-gray-900'>
					Login to your account
				</h2>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='email-address' className='sr-only'>
								Email
							</label>
							<input
								id='email-address'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='email-address' className='sr-only'>
								Username
							</label>
							<input
								id='username-address'
								name='username'
								type='username'
								autoComplete='username'
								required
								className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Sign in
						</button>
					</div>
				</form>
				<p className='mt-2 text-sm text-center text-gray-600'>
					Don't have an account?{' '}
					<Link to={'/signup'}>
						<a
							href='#'
							className='font-medium text-indigo-600 hover:text-indigo-500'
						>
							Sign up
						</a>
					</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginPage
