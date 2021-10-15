import React from 'react'
import { Switch, withRouter, Route } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import MetaData from '../../components/MetaData'

import { AUTH } from '../../config/meta'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../../assets/images/Logo.png'
import { Hidden, LinearProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import new_account from '../../assets/illustrations/new_account.svg'
import Login from './login'
import SignUp from './signup'
import Recovery from './recovery'
import ResetPassword from './passwordreset'
import Verified from './verified'
import Verification from './verification'
// import Verification from './verification'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: '1',

        minHeight: '100vh',
    },
    logo: {
        height: '45px',
        width: 'auto',
        cursor: 'pointer',
    },
    logoContainer: {
        width: '100%',
        display: 'flex',
        zIndex: '10',
        boxSizing: 'border-box',
        padding: '10px 30px',
        backgroundColor: 'white',
        position: 'fixed',
        top: '0px',
        [theme.breakpoints.down('sm')]: {
            padding: '0px',
        },
    },
    content: {
        display: 'flex',
        flex: '3',
        flexDirection: 'column',
        padding: '10px 30px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    graphics: {
        display: 'flex',
        flex: '2',
        zIndex: '20',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
    },
    graphicsImage: {
        width: '30%',
        position: 'fixed',
        top: '20vh',
        height: 'auto',
        margin: '100px auto',
    },
}))

function Auth(props) {
    const classes = useStyles(props)
    const user = useSelector((state) => state.auth.user)
    const userLoading = useSelector((state) => state.auth.loading)
    return (
        <Box className={classes.container}>
            {userLoading && (
                <LinearProgress
                    style={{
                        width: '100vw',
                        position: 'fixed',
                        top: '0px',
                        zIndex: '32',
                    }}
                    color="secondary"></LinearProgress>
            )}
            <Box className={classes.content}>
                <Box className={classes.logoContainer}>
                    <img
                        onClick={() => {
                            props.history.push('/')
                        }}
                        alt="logo"
                        title={'DnC Home'}
                        className={classes.logo}
                        src={Logo}></img>
                </Box>

                <Switch>
                    {!user && (
                        <Route path="/auth/signup">
                            <SignUp loading={userLoading} />
                        </Route>
                    )}
                    {!user && (
                        <Route exact path="/auth/recovery">
                            <Recovery loading={userLoading} />
                        </Route>
                    )}
                    <Route exact path="/auth/recovery/:id">
                        <ResetPassword loading={userLoading}></ResetPassword>
                    </Route>

                    <Route exact path="/auth/verify/:id">
                        <Verified user={user} loading={userLoading}></Verified>
                    </Route>

                    <Route path="/auth">
                        {user ? (
                            <Verification
                                loading={userLoading}
                                user={user}></Verification>
                        ) : (
                            <Login loading={userLoading} />
                        )}
                    </Route>
                </Switch>
            </Box>
            <Hidden xsDown>
                <Box className={classes.graphics}>
                    <img
                        alt="authentication"
                        title={'Authentication'}
                        className={classes.graphicsImage}
                        src={new_account}></img>
                </Box>
            </Hidden>

            <MetaData data={AUTH} />
        </Box>
    )
}

export default withRouter(Auth)
