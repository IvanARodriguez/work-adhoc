import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import {
	InitialConfigType,
	LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ListItemNode, ListNode } from '@lexical/list'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import Toolbar from './Toolbar'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'

const theme = {
	heading: {
		h1: 'text-3xl ',
		h2: 'text-2xl',
		h3: 'text-xl',
	},
	text: {
		bold: 'editor-textBold',
		code: 'editor-textCode',
		italic: 'editor-textItalic',
		strikethrough: 'editor-textStrikethrough',
		subscript: 'editor-textSubscript',
		superscript: 'editor-textSuperscript',
		underline: 'editor-textUnderline',
		underlineStrikethrough: 'editor-textUnderlineStrikethrough',
	},
	list: {
		ul: 'list-disc list-inside',
		ol: 'list-decimal list-inside',
		listItem: 'list-disc list-inside',
	},
}

function TextEditor() {
	const config: InitialConfigType = {
		namespace: 'lexical-editor',
		theme,
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			AutoLinkNode,
			LinkNode,
		],
		onError: (error: Error) => {
			console.error(error)
		},
	}

	return (
		<div className='container'>
			<LexicalComposer initialConfig={config}>
				<ListPlugin />
				<Toolbar />
				<RichTextPlugin
					contentEditable={
						<ContentEditable className='border-gray-200 relative focus:outline-gray-300 bg-gray-100 border-2 p-2   h-[20rem] overflow-auto contentEditable' />
					}
					placeholder={
						<div className='editor-placeholder '>Enter some text...</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<HistoryPlugin />
				<LinkPlugin />
				<AutoFocusPlugin />
				{/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
			</LexicalComposer>
		</div>
	)
}

export default TextEditor
