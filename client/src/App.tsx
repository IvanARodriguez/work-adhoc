import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './PrivateRoute'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CreateJobPage from './pages/CreateJobPage'
import NotFoundPage from './pages/NotFoundPage'
import JobsPage from './pages/JobsPage'
import JobView from './pages/JobView'
import { useActions } from './store'
import { useLayoutEffect } from 'react'
import RegisterPage from './pages/RegisterPage'

function App() {
	const actions = useActions()
	useLayoutEffect(() => {
		actions.users.verifyAuthentication()
	}, [])
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<RegisterPage />} />
				<Route path='/jobs' element={<JobsPage />} />
				<Route path='/jobs/:id' element={<JobView />} />
				<Route element={<PrivateRoute />}>
					<Route element={<CreateJobPage />} path='/jobs/create' />
				</Route>
				<Route path='*' element={<NotFoundPage />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
