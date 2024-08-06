export type User = {
	username: string
	email: string
	createdAt: string
	updatedAt: string
}

export type UserState = {
	isAuthenticated: boolean
	user: User
	loginError: string
	isLoading: boolean
	credentials: {
		username: string
		password: string
	}
}

export type Job = {
	id: string
	title: string
	salary: string
	description?: string
	overview: string
	createdAt: string
	updatedAt: string
	user: {
		username: string
	}
	tags: {
		id: string
		name: string
	}[]
}
