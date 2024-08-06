import { Context } from '..'
import { isErrorResponse } from '../../helpers/errorResponse'

export function setCredential(
	{ state }: Context,
	creds: { credType: 'username' | 'password'; value: string }
) {
	state.users.loginError = ''
	if (creds.credType === 'username') {
		state.users.credentials.username = creds.value
		return
	}

	state.users.credentials.password = creds.value
}

export async function login({ state, effects }: Context) {
	const res = await effects.users.login(state.users.credentials)
	if (isErrorResponse(res)) {
		state.users.isLoading = false
		state.users.isAuthenticated = false
		const { message } = await res.result.json()
		state.users.loginError = message
		return
	}
	state.users.loginError = ''
	state.users.isLoading = false
	state.users.isAuthenticated = true
	state.users.user = res
}
export async function logout({ state, effects }: Context) {
	state.users.isLoading = true
	const res = await effects.users.logout()
	if (isErrorResponse(res)) {
		state.users.isLoading = false
		const { message } = await res.result.json()
		state.users.loginError = message
		return
	}
	state.users.isLoading = false
	state.users.isAuthenticated = false
}

export async function verifyAuthentication({ state, effects }: Context) {
	console.log('Authenticating')
	state.users.isLoading = true
	const res = await effects.users.confirmAuthentication()
	if (isErrorResponse(res)) {
		state.users.isAuthenticated = false
		state.users.isLoading = false
		return
	}
	state.users.loginError = ''
	state.users.isLoading = false
	state.users.isAuthenticated = res.isAuthenticated
}
