import { UserState } from '../../types/overmind'

export const state: UserState = {
	isAuthenticated: false,
	user: {
		createdAt: '',
		updatedAt: '',
		email: '',
		username: '',
	},
}
