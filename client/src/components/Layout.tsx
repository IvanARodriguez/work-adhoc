import Header from './Header'
import Footer from './Footer'
import { useEffect } from 'react'
import { useActions } from '../store'
import { PageName } from '../types/helpers'

/**
 * @param currentPage  must match the Navbar Link to be highlighted
 */

function Layout({
	children,
	currentPage,
}: {
	children: JSX.Element
	currentPage?: PageName
}) {
	const actions = useActions()
	useEffect(() => {
		actions.app.setNavbarLink(currentPage ?? '')
	}, [])
	return (
		<div className='flex flex-col w-full min-h-screen'>
			<Header />
			<div className='flex-grow grid '>{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
