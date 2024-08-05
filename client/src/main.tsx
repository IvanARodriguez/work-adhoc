import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createOvermind } from 'overmind'
import { config } from './store/index.ts'
import { Provider } from 'overmind-react'

const overmind = createOvermind(config, {
	devtools: 'localhost:3031',
	name: 'Momentum',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider value={overmind}>
			<App />
		</Provider>
	</React.StrictMode>
)
