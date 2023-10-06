import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#89b0a0',
			dark: '#5d756b',
		},
		secondary: {
			main: '#5e8072',
		},
		error: {
			main:'#f0562b',
		},
		warning:{
			main: '#d98638'
		},
		success: {
			main: '#bfe371'
		},
	}
})



ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>
)