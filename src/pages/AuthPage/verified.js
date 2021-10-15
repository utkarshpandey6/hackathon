import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter, useParams } from 'react-router-dom'
import { withAnimateAuth } from '../../hoc/animateAuth'
import { useDispatch } from 'react-redux'
import { authLoading, setUser } from '../../store/auth'
import { setNotification } from '../../store/notification'
import { apiInstance } from '../../config/httpClient'
import { VERIFY, PROFILE } from '../../config/dynamic_urls'
import Box from '@material-ui/core/Box'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
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
    textField: {
        width: '60%',
        margin: '10px 0px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
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

    icons: {
        color: theme.palette.text.secondary,
    },
}))

function Login(props) {
    const classes = useStyles(props)
    const { id } = useParams()
    const [verified, setVerified] = useState(false)
    const [failed, setFailed] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (verified) return
        const verify = async () => {
            dispatch(authLoading(true))
            try {
                const body = { token: id }
                const res = await apiInstance.put(VERIFY, body)

                dispatch(authLoading(false))

                dispatch(
                    setNotification({
                        message: res.data.message,
                        severity: 'success',
                    })
                )
                if (props.user) {
                    const user = await apiInstance.get(PROFILE)
                    dispatch(setUser(user.data))
                }
                setVerified(true)
            } catch (err) {
                dispatch(authLoading(false))
                dispatch(
                    setNotification({
                        message: err.response
                            ? `${err.response.data.message} : Verification Failed`
                            : 'Network error',
                        severity: 'error',
                    })
                )
                setVerified(true)
                setFailed(true)
            }
        }

        verify()
    }, [])

    return (
        <Box className={classes.container}>
            <Hidden xsDown>
                <div style={{ height: '22vh' }}></div>
            </Hidden>
            <Typography gutterBottom variant="h2" className={classes.heading}>
                {verified ? 'Verified' : 'Verifying...'}
            </Typography>
            <Divider className={classes.divider}></Divider>
            {verified ? (
                <Typography
                    gutterBottom
                    variant="h6"
                    color="textSecondary"
                    style={{ marginBottom: '20px' }}>
                    {failed
                        ? 'Uh-Oh ! Verification Failed'
                        : 'Hurray ! You have been verified.'}
                </Typography>
            ) : (
                <Skeleton
                    variant="h6"
                    animation="wave"
                    style={{ marginBottom: '20px' }}
                    width="200px"></Skeleton>
            )}

            {verified ? (
                <Typography
                    gutterBottom
                    variant="body1"
                    color="textSecondary"
                    style={{ marginBottom: '20px', textAlign: 'left' }}>
                    {failed
                        ? "Don't Worry you can re-verify yourself anytime. Refreshing after checking your connection might solve the issue."
                        : 'Your email address is verified. Welcome to the community :)'}
                </Typography>
            ) : (
                <Skeleton
                    variant="body1"
                    animation="wave"
                    style={{ marginBottom: '20px' }}
                    width="400px"></Skeleton>
            )}
            <Box className={classes.buttonContainer}>
                {failed ? (
                    <Button
                        onClick={() => {
                            props.history.push('/auth')
                        }}
                        disabled={!verified}
                        variant="contained"
                        color="primary">
                        <Typography style={{ color: 'white' }} variant="button">
                            Re-Verify
                        </Typography>
                    </Button>
                ) : props.user ? (
                    <Button
                        onClick={() => {
                            props.history.push('/')
                        }}
                        variant="contained"
                        disabled={!verified}
                        color="primary">
                        <Typography style={{ color: 'white' }} variant="button">
                            Home
                        </Typography>
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            props.history.push('/auth')
                        }}
                        variant="contained"
                        disabled={!verified}
                        color="primary">
                        <Typography style={{ color: 'white' }} variant="button">
                            Log In
                        </Typography>
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default withAnimateAuth(withRouter(Login))
