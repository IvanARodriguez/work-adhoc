import { useState } from 'react'
import { useState as overmindState, useActions } from '../store'
import { Link } from 'react-router-dom'
import { PageName } from '../types/helpers'

const pageLinks: { name: PageName; link: string }[] = [
	{ name: 'Home', link: '/' },
	{ name: 'Jobs', link: '/jobs' },
]

function Header() {
	const [menuOpen, setMenuOpen] = useState(false)
	const { app, users } = overmindState()
	const actions = useActions()
	const handleMenuToggle = () => {
		setMenuOpen(!menuOpen)
	}
	const selectedLinkClasses =
		'md:dark:text-purple-500 text-white bg-gray-300 rounded md:bg-transparent md:text-gray-300 md:p-0 dark:text-black'

	const unselectedLinkClasses =
		'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'

	function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()
		actions.users.logout()
	}

	return (
		<header className='bg-white w-full'>
			<nav className='bg-white border-gray-200 dark:bg-gray-200 w-full'>
				<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
					<Link
						to='/'
						className='flex items-center space-x-3 rtl:space-x-reverse'
					>
						<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-black'>
							WorkAdHoc
						</span>
					</Link>
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
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
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
						<ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row   rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-00 md:dark:bg-gray-200 dark:border-gray-400 gap-4 justify-center items-center'>
							{pageLinks.map((page, i) => (
								<li key={page.name + i}>
									<Link
										to={page.link}
										className={`block py-2 px-3 ${
											page.name === app.Navbar.currentPage
												? selectedLinkClasses
												: unselectedLinkClasses
										}`}
										aria-current='page'
									>
										{page.name}
									</Link>
								</li>
							))}
							{!users.isAuthenticated ? (
								<>
									<li className='block'>
										<Link
											className={`block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center disabled `}
											to={'/login'}
										>
											Login
										</Link>
									</li>
									<li>
										<Link
											className='block text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center '
											to={'/login'}
										>
											Register
										</Link>
									</li>
								</>
							) : (
								<button
									onClick={handleLogout}
									className='block text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center '
								>
									Logout
								</button>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
