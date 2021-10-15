import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authLoading } from '../../store/auth'
import { apiInstance } from '../../config/httpClient'
import { PASSWORD_RESET_REQUEST } from '../../config/dynamic_urls'
import { setNotification } from '../../store/notification'
import { withAnimateAuth } from '../../hoc/animateAuth'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Hidden from '@material-ui/core/Hidden'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import InputAdornment from '@material-ui/core/InputAdornment'
import { SettingsEthernet } from '@material-ui/icons'
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
    const [input, setInput] = useState({ username: { value: '', error: null } })
    const dispatch = useDispatch()
    const [sent, setSent] = useState(false)
    const handleChange = (e) => {
        const name = e.target.getAttribute('name')
        const newInput = { ...input }
        newInput[name] = {
            ...newInput[name],
            value: e.target.value.trim(),
            error: null,
        }

        setInput(newInput)
    }
    const validate = () => {
        const newInput = { ...input }
        let flag = 0
        if (input.username.value.length < 3) {
            flag = 1
            newInput.username.error =
                'Username/Email should be atleast 3 in length'
        }

        if (flag) {
            setInput(newInput)
            return false
        }

        return true
    }

    const handleSubmit = async () => {
        dispatch(authLoading(true))

        if (!validate()) {
            dispatch(authLoading(false))
            return
        }

        try {
            const body = {
                username: input.username.value,
            }
            const data = await apiInstance.post(PASSWORD_RESET_REQUEST, body)
            setSent(true)
            dispatch(
                setNotification({
                    message: `Check your mail inbox, password reset link has been sent.`,
                    severity: 'success',
                })
            )
            dispatch(authLoading(false))
        } catch (err) {
            dispatch(
                setNotification({
                    message: err.response
                        ? err.response.data.message
                        : 'Network error',
                    severity: 'error',
                })
            )
            dispatch(authLoading(false))
        }
    }

    return (
        <Box className={classes.container}>
            <Hidden xsDown>
                <div style={{ height: '22vh' }}></div>
            </Hidden>
            <Typography gutterBottom variant="h2" className={classes.heading}>
                Recovery
            </Typography>
            <Divider className={classes.divider}></Divider>
            <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                style={{ marginBottom: '20px' }}>
                {sent
                    ? 'Password Reset Link Sent Successfully !'
                    : 'Provide us your details !'}
            </Typography>
            {!sent ? (
                <form
                    id="recovery_form"
                    prevent
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit(e)
                    }}
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        value={input.username.value}
                        required={true}
                        name="username"
                        onChange={handleChange}
                        error={input.username.error}
                        helperText={
                            input.username.error
                                ? input.username.error
                                : '*Required'
                        }
                        placeholder="Username / Email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon
                                        className={classes.icons}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        label="Username / Email"></TextField>
                    <Box className={classes.buttonContainer}>
                        <Button
                            onClick={() => {
                                props.history.push('/auth')
                            }}
                            disabled={props.loading}
                            variant="outlined"
                            color="primary">
                            Log In
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={props.loading}
                            color="primary">
                            <Typography
                                style={{ color: 'white' }}
                                variant="button">
                                Submit
                            </Typography>
                        </Button>
                    </Box>
                </form>
            ) : (
                <React.Fragment>
                    <Typography gutterBottom style={{ marginBottom: '15px' }}>
                        Password reset link has been sent to your email, please
                        check your inbox or spam box.
                    </Typography>
                    <Button
                        onClick={() => {
                            props.history.push('/auth')
                        }}
                        disabled={props.loading}
                        variant="outlined"
                        color="primary">
                        Log In
                    </Button>
                </React.Fragment>
            )}
        </Box>
    )
}

export default withAnimateAuth(withRouter(Login))
