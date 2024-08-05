export type User = {
	username: string
	email: string
	createdAt: string
	updatedAt: string
}

export type UserState = {
	isAuthenticated: boolean
	user: User
}

export type Job = {
	id: string
	title: string
	salary: string
	description: string
	createdAt: string
	updatedAt: string
	user: {
		username: string
	}
}
