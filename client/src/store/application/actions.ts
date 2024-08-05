import { Context } from '..'
import { PageName } from '../../types/helpers'

export function setNavbarLink({ state }: Context, pageName: PageName) {
	state.app.Navbar.currentPage = pageName
}
