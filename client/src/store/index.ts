import { namespaced } from 'overmind/config'
import * as users from './users'
import * as jobs from './jobs'
import * as app from './application'
import { IContext } from 'overmind'
import {
	createActionsHook,
	createEffectsHook,
	createReactionHook,
	createStateHook,
} from 'overmind-react'

export const config = namespaced({
	users,
	jobs,
	app,
})

export type Context = IContext<typeof config>

export const useState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()
export const useEffects = createEffectsHook<Context>()
export const useReaction = createReactionHook<Context>()
