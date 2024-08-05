import { useState } from './store'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './components/Loader'

function PrivateRoute() {
	const { users } = useState()

	users.isLoading && <Loader />

	return users.isAuthenticated === true ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
