import React from 'react'

interface DividerProps {
	className?: string
	useVertical?: boolean
}

const Divider: React.FC<DividerProps> = ({ className, useVertical }) => {
	return (
		<div
			className={`${
				useVertical
					? 'border-l-2 rounded h-[inherit]'
					: 'border-b-2 rounded w-[inherit]'
			} border-gray-300 ${className}`}
		/>
	)
}

export default Divider
