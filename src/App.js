import React, { useEffect, useState } from 'react'
import './App.css'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { authLoading, setUser } from './store/auth'
import { closeNotification } from './store/notification'
import Snackbar from '@material-ui/core/Snackbar'
import ReactGA from 'react-ga'
import asyncImportLoader from './hoc/asynComponentLoader'
import Handle404 from './components/Handle404'
import Header from './components/Header'
import Home from './pages/Homepage/content'

import NotFound from './pages/NotFound'

import Footer from './components/Footer'


import ContactPage from './pages/ContactPage'
import AuthPage from './pages/AuthPage'

import Profile from './pages/Profile'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import CommitteePage from './pages/CommitteePage'
import ScrollTop from './components/ScrollTop'
import { apiInstance } from './config/httpClient'
import { PROFILE } from './config/dynamic_urls'
// Async Loading Components, Must only be used for heavy components
const VideoContent = asyncImportLoader(() =>
    import('./pages/ResourcesPage/ResourcesSubPages/VideoTutorials/ContentPage')
)
const EventsPage = asyncImportLoader(() => import('./pages/EventPage'))
const IDE = asyncImportLoader(() =>
    import('./pages/ResourcesPage/ResourcesSubPages/IdePage/')
)

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

// App Component
function App(props) {
    let [screenWidth, setWidth] = useState(window.innerWidth)
    const [footer, setFooter] = useState(true)
    const location = useLocation()
    const classes = useStyles()
    const userLoading = useSelector((state) => state.auth.loading)
    const user = useSelector((state) => state.auth.user)
    const notification = useSelector((state) => ({
        message: state.notification.message,
        severity: state.notification.severity,
        open: state.notification.open,
    }))
    const dispatch = useDispatch()

    const fetchUser = () => {
        if (!localStorage.getItem('accessToken')) {
            dispatch(setUser(null))
            return
        }
        apiInstance
            .get(PROFILE)
            .then((res) => {
                dispatch(setUser(res.data))
            })
            .catch(() => {
                dispatch(authLoading(false))
                dispatch(setUser(null))
            })
    }

    useEffect(() => {
        ReactGA.initialize('UA-193030226-1')
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        fetchUser()
    }, [])

    let handleFooter = (vis) => {
        setFooter(vis)
    }

    const shouldHeaderHidden = () => {
        if (location.pathname.startsWith('/auth')) return true
        return false
    }

    const shouldFooterHidden = () => {
        if (location.pathname.startsWith('/404')) return true
        if (location.pathname.startsWith('/auth')) return true
        return false
    }

    const handleClose = () => {
        dispatch(closeNotification())
    }

    const shouldHeaderRaise = () => {
        console.log(location.pathname)
        if (location.pathname.startsWith('/blog')) return false

        return true
    }

    return (
        <div className="App">
            <Header
                screenWidth={screenWidth}
                hidden={shouldHeaderHidden()}
                raise={shouldHeaderRaise()}
                user={user}
                userLoading={userLoading}
            />
            <Snackbar
                key={notification.message}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                open={notification.open}
                autoHideDuration={5000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
            <ScrollTop></ScrollTop>
            <AnimatePresence
                exitBeforeEnter
                onExitComplete={() => {
                    window.scrollTo({ top: 0 })
                }}>
                <Switch location={location} key={location.pathname}>
                    <Route
                        path="/"
                        exact
                        children={<Home screenWidth={screenWidth} />}
                    />
                    <Route
                        path="/contact"
                        children={
                            <ContactPage screenWidth={screenWidth} />
                        }></Route>

                    <Route path="/profile" children={<Profile />}></Route>
                    <Route path="/auth" children={<AuthPage />} />

                    <Route
                        path="/404"
                        children={<NotFound screenWidth={screenWidth} />}
                    />
                    <Handle404 />
                </Switch>
            </AnimatePresence>
            {footer && (
                <Footer
                    screenWidth={screenWidth}
                    hidden={shouldFooterHidden()}
                />
            )}
        </div>
    )
}

export default App
