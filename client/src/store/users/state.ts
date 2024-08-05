import { UserState } from '../../types/overmind'

export const state: UserState = {
	isAuthenticated: false,
	credentials: {
		username: '',
		password: '',
	},
	isLoading: true,
	loginError: '',
	user: {
		createdAt: '',
		updatedAt: '',
		email: '',
		username: '',
	},
}
