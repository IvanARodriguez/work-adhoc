import Header from './Header'
import Footer from './Footer'

function Layout({ children }: { children: JSX.Element }) {
	return (
		<div className='flex flex-col w-full min-h-screen'>
			<Header />
			<div className='flex-grow grid '>{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
