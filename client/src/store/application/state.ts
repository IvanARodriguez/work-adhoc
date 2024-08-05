import { PageName } from '../../types/helpers'

type Application = {
	Navbar: {
		currentPage: PageName
	}
}

export const state: Application = {
	Navbar: {
		currentPage: '',
	},
}
