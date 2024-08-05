import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useActions, useState } from '../store'

function LoginPage() {
	const actions = useActions()
	const { users } = useState()
	function setUsername(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value ?? ''
		actions.users.setCredential({ credType: 'username', value })
	}
	function setPassword(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value ?? ''
		actions.users.setCredential({ credType: 'password', value })
	}
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		actions.users.login()
	}

	if (users.isAuthenticated) return <Navigate to={'/'} />
	return (
		<Layout>
			<div className='flex items-center justify-center min-h-full  login-screen'>
				<div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
					<h2 className='text-3xl font-bold text-center text-gray-900'>
						Welcome Back
					</h2>
					<h3 className='text-2xl font-bold text-center text-gray-900'>
						Login to your account
					</h3>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email or Username
								</label>
								<input
									id='email-address'
									name='username'
									required
									className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Email or Username'
									value={users.credentials.username}
									onChange={setUsername}
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
									value={users.credentials.password}
									onChange={setPassword}
								/>
							</div>
						</div>
						{users.loginError && (
							<p className='text-red-600'>{users.loginError}</p>
						)}

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
						<Link
							to={'/signup'}
							className='font-medium text-indigo-600 hover:text-indigo-500'
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</Layout>
	)
}

export default LoginPage
