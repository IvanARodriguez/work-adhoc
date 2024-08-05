import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
	const [menuOpen, setMenuOpen] = useState(false)

	const handleMenuToggle = () => {
		setMenuOpen(!menuOpen)
	}

	return (
		<header className='bg-white w-full'>
			<nav className='bg-white border-gray-200 dark:bg-gray-200 w-full'>
				<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
					<a
						href='https://flowbite.com/'
						className='flex items-center space-x-3 rtl:space-x-reverse'
					>
						<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-black'>
							WorkAdHoc
						</span>
					</a>
					<button
						onClick={handleMenuToggle}
						type='button'
						className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
						aria-controls='navbar-default'
						aria-expanded={menuOpen}
					>
						<span className='sr-only'>Open main menu</span>
						<svg
							className='w-5 h-5'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 17 14'
						>
							<path
								stroke='currentColor'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								d='M1 1h15M1 7h15M1 13h15'
							/>
						</svg>
					</button>
					<div
						className={`${
							menuOpen ? 'block' : 'hidden'
						} w-full md:block md:w-auto`}
						id='navbar-default'
					>
						<ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-00 md:dark:bg-gray-200 dark:border-gray-400'>
							<li>
								<Link
									to={'/'}
									className='block py-2 px-3 text-white bg-gray-300 rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-black md:dark:text-purple-500'
									aria-current='page'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to={'/jobs'}
									className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
								>
									Jobs
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
