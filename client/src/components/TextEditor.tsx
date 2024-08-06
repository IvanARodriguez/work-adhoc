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
import { CodeHighlightNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'

const theme = {
	heading: {
		h1: 'text-4xl',
		h2: 'text-3xl',
		h3: 'text-2xl',
	},
}

function TextEditor() {
	const config: InitialConfigType = {
		namespace: 'lexical-editor',
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			CodeHighlightNode,
			AutoLinkNode,
			LinkNode,
		],
		onError: (error: Error) => {
			console.error(error)
		},
		theme,
	}

	return (
		<div className='container  '>
			<LexicalComposer initialConfig={config}>
				<Toolbar />
				<RichTextPlugin
					contentEditable={
						<ContentEditable className='border-gray-200 focus:outline-gray-300 bg-gray-100 border-2 p-2 h-[20rem] overflow-auto contentEditable' />
					}
					placeholder={<div className='placeholder'>Enter some text...</div>}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<HistoryPlugin />
				<ListPlugin />
				<LinkPlugin />
				<AutoFocusPlugin />
				{/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
			</LexicalComposer>
		</div>
	)
}

export default TextEditor
