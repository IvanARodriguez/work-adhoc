import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { useState } from 'react'

function Toolbar() {
	const [editor] = useLexicalComposerContext()
	const [isBold, setIsBold] = useState<boolean>(false)
	const [isItalic, setIsItalic] = useState<boolean>(false)
	const [isUnderline, setIsUnderline] = useState<boolean>(false)

	return (
		<div className='w-full flex gap-2 overflow-auto p-1'>
			<button
				className='font-bold'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
					const selection = $getSelection()
					if ($isRangeSelection(selection)) {
						setIsBold(selection.hasFormat('bold'))
					}
					setIsBold(!isBold)
				}}
			>
				B
			</button>
			{Array.from<HeadingTagType>(['h1', 'h2', 'h3']).map((heading, i) => (
				<button
					className='font-bold'
					key={heading + i}
					onClick={() => {
						editor.update(() => {
							const selection = $getSelection()
							if ($isRangeSelection(selection)) {
								$setBlocksType(selection, () => $createHeadingNode(heading))
							}
						})
					}}
				>
					{heading.toLocaleUpperCase()}
				</button>
			))}
		</div>
	)
}

export default Toolbar
