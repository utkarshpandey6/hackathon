import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect, withRouter } from 'react-router-dom'
import { withAnimateAuth } from '../../hoc/animateAuth'
import { apiInstance } from '../../config/httpClient'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { authLoading } from '../../store/auth'
import { setNotification } from '../../store/notification'
import { SEND_VERIFICATION } from '../../config/dynamic_urls'
import Divider from '@material-ui/core/Divider'
import { logout } from '../../store/auth'
import { useDispatch } from 'react-redux'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',

        alignItems: 'flex-start',
        width: '100%',
        minHeight: '95vh',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'flex-start',
        },
    },
    heading: {
        fontWeight: 600,
        [theme.breakpoints.down('xs')]: {
            marginTop: '75px',
        },
    },
    divider: {
        backgroundColor: theme.palette.text.primary,
        width: '50%',
        height: '5px',
        marginBottom: '15px',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '2px',
        },
    },

    buttonContainer: {
        width: '60%',
        margin: '15px 0px',
        display: 'flex',
        flexWrap: 'row',

        justifyContent: 'space-between',

        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}))

function Login(props) {
    const classes = useStyles(props)
    const dispatch = useDispatch()
    const [sent, setSent] = useState(false)
    if (props.user && props.user.verified) return <Redirect path="/"></Redirect>

    let handleLogout = () => {
        localStorage.removeItem('accessToken')
        dispatch(logout())
        dispatch(
            setNotification({
                message: 'Logged Out Successfully !',
                severity: 'success',
            })
        )
    }

    const handleSend = async () => {
        dispatch(authLoading(true))
        try {
            const { first_name, last_name, email } = props.user
            const body = { first_name, last_name, email }
            const res = await apiInstance.post(SEND_VERIFICATION, body)
            dispatch(authLoading(false))
            dispatch(
                setNotification({
                    message: `Verification sent to ${email}`,
                    severity: 'success',
                })
            )
            setSent(true)
        } catch (err) {
            dispatch(authLoading(false))
            dispatch(
                setNotification({
                    message: err.response
                        ? err.response.data.message
                        : 'Network error',
                    severity: 'error',
                })
            )
        }
    }

    return (
        <Box className={classes.container}>
            <Hidden xsDown>
                <div style={{ height: '22vh' }}></div>
            </Hidden>
            <Typography gutterBottom variant="h2" className={classes.heading}>
                Verification
            </Typography>
            <Divider className={classes.divider}></Divider>
            <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                style={{ marginBottom: '20px' }}>
                Please verify your email !
            </Typography>

            <Typography
                gutterBottom
                variant="body1"
                color="textSecondary"
                style={{ marginBottom: '20px' }}>
                {`Hi ${props.user.first_name}, you are logged in, but you are not yet verified.`}
            </Typography>

            <Typography
                gutterBottom
                variant="body1"
                color="textSecondary"
                style={{ marginBottom: '20px' }}>
                {sent
                    ? 'We have sent you a verification email, please check your inbox or your spam box.'
                    : 'We will send you a verification email to your registered email address.'}
            </Typography>

            <Box className={classes.buttonContainer}>
                <Button
                    onClick={handleLogout}
                    variant="outlined"
                    color="primary">
                    Log Out
                </Button>
                {!sent && (
                    <Button
                        disabled={props.loading}
                        onClick={handleSend}
                        variant="contained"
                        color="primary">
                        <Typography style={{ color: 'white' }} variant="button">
                            Send Verification
                        </Typography>
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default withAnimateAuth(withRouter(Login))
