import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection'
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_LOW,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu'
import {
	FaUnderline,
	FaItalic,
	FaBold,
	FaAlignCenter,
	FaAlignLeft,
	FaStrikethrough,
	FaAlignRight,
} from 'react-icons/fa6'
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text'
import { mergeRegister } from '@lexical/utils'
import Divider from './Divider'
import { FaAlignJustify, FaRedo, FaUndo } from 'react-icons/fa'

function HeadingToolbarPlugin(): JSX.Element {
	const [editor] = useLexicalComposerContext()
	const [selectedTag, setSelectedTag] = useState<HeadingTagType | ''>('')
	const $updateToolbar = useCallback(() => {
		const selection = $getSelection()
		if ($isRangeSelection(selection)) {
			// Update text format
			console.table(selection)
		}
	}, [])
	return (
		<>
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
							console.log()
							const selection = $getSelection()
							$updateToolbar()
							if ($isRangeSelection(selection)) {
								$setBlocksType(selection, () => $createHeadingNode(heading.tag))
								setSelectedTag(heading.tag)
								return
							}
						})
					}}
				>
					<heading.icon className='h-[1.5rem] w-[1.5rem]' />
				</button>
			))}
		</>
	)
}

function Toolbar() {
	const [editor] = useLexicalComposerContext()
	const toolbarRef = useRef(null)
	const [canUndo, setCanUndo] = useState(false)
	const [canRedo, setCanRedo] = useState(false)
	const [isBold, setIsBold] = useState(false)
	const [isItalic, setIsItalic] = useState(false)
	const [isUnderline, setIsUnderline] = useState(false)
	const [isStrikethrough, setIsStrikethrough] = useState(false)

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection()
		if ($isRangeSelection(selection)) {
			// Update text format
			setIsBold(selection.hasFormat('bold'))
			setIsItalic(selection.hasFormat('italic'))
			setIsUnderline(selection.hasFormat('underline'))
			setIsStrikethrough(selection.hasFormat('strikethrough'))
		}
	}, [])

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar()
				})
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				(_payload, _newEditor) => {
					$updateToolbar()
					return false
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload)
					return false
				},
				COMMAND_PRIORITY_LOW
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload)
					return false
				},
				COMMAND_PRIORITY_LOW
			)
		)
	}, [editor, $updateToolbar])

	return (
		<div className='w-full flex flex-wrap gap-2 overflow-auto p-1'>
			<button
				disabled={!canUndo}
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND, undefined)
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					bg-gray-100`}
				aria-label='Undo'
			>
				<FaUndo />
			</button>
			<button
				disabled={!canRedo}
				onClick={() => {
					editor.dispatchCommand(REDO_COMMAND, undefined)
				}}
				aria-label='Redo'
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					bg-gray-100`}
			>
				<FaRedo />
			</button>
			<Divider useVertical />
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					${isBold ? 'bg-gray-300' : 'bg-gray-100'}`}
				aria-label='Format Bold'
			>
				<FaBold />
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					${isItalic ? 'bg-gray-300' : 'bg-gray-100'}`}
				aria-label='Format Italics'
			>
				<FaItalic />
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					${isUnderline ? 'bg-gray-300' : 'bg-gray-100'}`}
				aria-label='Format Underline'
			>
				<FaUnderline />
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					${isStrikethrough ? 'bg-gray-300' : 'bg-gray-100'}`}
				aria-label='Format Strikethrough'
			>
				<FaStrikethrough />
			</button>
			<Divider useVertical />
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					bg-gray-100`}
				aria-label='Left Align'
			>
				<FaAlignLeft />
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					bg-gray-100`}
				aria-label='Center Align'
			>
				<FaAlignCenter />
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					bg-gray-100`}
				aria-label='Right Align'
			>
				<FaAlignRight />
			</button>
			<button
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
				}}
				className={`
					font-bold
					rounded
					w-[2rem]
					h-[2rem]
					flex
					items-center
					justify-center
					bg-gray-100`}
				aria-label='Justify Align'
			>
				<FaAlignJustify />
			</button>
			<Divider useVertical />
			<HeadingToolbarPlugin />
		</div>
	)
}

export default Toolbar
