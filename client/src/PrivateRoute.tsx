import { useState } from './store'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
	const { users } = useState()

	return users.isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
