import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection'
import {
	$getSelection,
	$isRangeSelection,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
} from 'lexical'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu'
import {
	FaUnderline,
	FaItalic,
	FaBold,
	FaAlignCenter,
	FaAlignLeft,
} from 'react-icons/fa6'
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text'

function Toolbar() {
	const [editor] = useLexicalComposerContext()
	const [isBold, setIsBold] = useState<boolean>(false)
	const [selectedTag, setSelectedTag] = useState<HeadingTagType | ''>('')
	const [position, setPosition] = useState<string>('')
	const [isItalic, setIsItalic] = useState<boolean>(false)

	return (
		<div className='w-full flex gap-2 overflow-auto p-1'>
			<button
				className={`
					font-bold 
					rounded  
					w-[2rem] 
					h-[2rem]
					flex
					items-center
					justify-center
					${isBold ? 'bg-gray-300' : 'bg-gray-100'}`}
				onClick={() => {
					editor.update(() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
						const selection = $getSelection()
						if ($isRangeSelection(selection)) {
							setIsBold(selection.hasFormat('bold'))
						}
					})
				}}
			>
				<FaBold />
			</button>
			<button
				className={`
					font-bold
					rounded  
					w-[2rem] 
					h-[2rem]
					flex
					items-center
					justify-center
					${position === 'left' ? 'bg-gray-300' : 'bg-gray-100'}`}
				onClick={() => {
					editor.update(() => {
						const selection = $getSelection()
						if ($isRangeSelection(selection)) {
							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
							setPosition('left')
						}
					})
				}}
			>
				<FaAlignLeft />
			</button>
			<button
				className={`
					font-bold
					rounded  
					w-[2rem] 
					h-[2rem]
					flex
					items-center
					justify-center
					${position === 'center' ? 'bg-gray-300' : 'bg-gray-100'}`}
				onClick={() => {
					editor.update(() => {
						const selection = $getSelection()
						if ($isRangeSelection(selection)) {
							editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
							setPosition('center')
						}
					})
				}}
			>
				<FaAlignCenter />
			</button>

			<button
				className={`
					font-bold
					rounded  
					w-[2rem] 
					h-[2rem]
					flex
					items-center
					justify-center
					${isItalic ? 'bg-gray-300' : 'bg-gray-100'}`}
				onClick={() => {
					editor.update(() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
						const selection = $getSelection()
						if ($isRangeSelection(selection)) {
							setIsItalic(selection.hasFormat('italic'))
						}
					})
				}}
			>
				<FaItalic />
			</button>
			{Array.from<{ tag: HeadingTagType; icon: IconType }>([
				{ tag: 'h1', icon: LuHeading1 },
				{ tag: 'h2', icon: LuHeading2 },
				{ tag: 'h3', icon: LuHeading3 },
			]).map((heading, i) => (
				<button
					className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					${selectedTag === heading.tag ? 'bg-gray-300' : 'bg-gray-100'}`}
					key={heading.tag + i}
					onClick={() => {
						editor.update(() => {
							const selection = $getSelection()
							if ($isRangeSelection(selection)) {
								$setBlocksType(selection, () => $createHeadingNode(heading.tag))
								setSelectedTag(heading.tag)
							}
						})
					}}
				>
					<heading.icon className='h-[1.5rem] w-[1.5rem]' />
				</button>
			))}
		</div>
	)
}

export default Toolbar
