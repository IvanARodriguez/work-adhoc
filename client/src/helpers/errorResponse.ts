import { ErrorResponse } from '../types/helpers'

export function isErrorResponse<T>(
	res: (T extends Promise<unknown> ? never : T) | ErrorResponse
): res is ErrorResponse {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return typeof (res as any).error === 'boolean' && (res as any).error === true
}

export function createErrorResponse(res: Response) {
	const resultFromError: ErrorResponse = { error: true, result: res }
	return resultFromError
}
