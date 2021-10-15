import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { BASE_URL } from './config/urls'
import {
    createMuiTheme,
    ThemeProvider,
    responsiveFontSizes,
} from '@material-ui/core/styles'
import theme from './config/theme'
import store from './store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'

axios.defaults.baseURL = BASE_URL

let Mtheme = createMuiTheme({
    palette: {
        primary: {
            main: theme.color.primary,
            contrastText: '#2d3436',
        },
        secondary: {
            main: theme.color.secondary,
        },
    },
})

Mtheme = responsiveFontSizes(Mtheme)

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={Mtheme}>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
