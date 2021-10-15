import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withAnimateAuth } from '../../hoc/animateAuth'
import Box from '@material-ui/core/Box'
import { useDispatch } from 'react-redux'
import { authLoading, setUser } from '../../store/auth'
import { setNotification } from '../../store/notification'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Hidden from '@material-ui/core/Hidden'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import InputAdornment from '@material-ui/core/InputAdornment'
import { IconButton } from '@material-ui/core'
import { apiInstance } from '../../config/httpClient'
import { LOGIN, PROFILE } from '../../config/dynamic_urls'
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
    createNewAccountContainer: {
        width: '60%',
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'row',

        justifyContent: 'center',
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
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [input, setInput] = useState({
        username: { value: '', error: null },
        password: { value: '', error: null },
    })
    const dispatch = useDispatch()

    const verifyDetails = () => {
        let flag = 0
        const newInput = { ...input }
        if (input.password.value.length < 6) {
            flag = 1
            newInput.password.error = 'Password is atleast 6 characters long'
        } else {
            let x = 0
            let y = 0
            for (let i = 0; i < input.password.value.length; i++) {
                if (
                    input.password.value[i] >= '0' &&
                    input.password.value[i] <= '9'
                )
                    x++
            }

            if (x === 0)
                newInput.password.error =
                    'Password must contain atleast 1 number'
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

            if (!format.test(newInput.password.value)) {
                newInput.password.error =
                    'Password must contain atleast 1 special character'
            }
        }
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

    const handleLogin = async () => {
        dispatch(authLoading(true))
        if (!verifyDetails()) {
            dispatch(authLoading(false))
            return
        }
        try {
            const body = {
                username: input.username.value,
                password: input.password.value,
            }
            const data = await apiInstance.post(LOGIN, body)
            const { accessToken } = data.data
            localStorage.setItem('accessToken', accessToken)
            const user = await apiInstance.get(PROFILE)
            dispatch(setUser(user.data))
            dispatch(
                setNotification({
                    message: 'Welcome ' + user.data.first_name + '!',
                    severity: 'success',
                })
            )
        } catch (err) {
            dispatch(setUser(null))
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

    const handlePasswordVisibility = () => {
        const newValue = !passwordVisibility
        setPasswordVisibility(newValue)
    }

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

    return (
        <Box className={classes.container}>
            <Hidden xsDown>
                <div style={{ height: '22vh' }}></div>
            </Hidden>
            <Typography gutterBottom variant="h2" className={classes.heading}>
                Log In
            </Typography>
            <Divider className={classes.divider}></Divider>
            <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                style={{ marginBottom: '20px' }}>
                Please verify yourself.
            </Typography>
            <form
                id="auth_form"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}
                prevent
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    name="username"
                    required={true}
                    error={input.username.error}
                    value={input.username.value}
                    placeholder="Username / Email"
                    helperText={
                        input.username.error
                            ? input.username.error
                            : '*Required'
                    }
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon className={classes.icons} />
                            </InputAdornment>
                        ),
                    }}
                    label="Username / Email"></TextField>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    name="password"
                    required={true}
                    onChange={handleChange}
                    error={input.password.error}
                    value={input.password.value}
                    helperText={
                        input.password.error
                            ? input.password.error
                            : '*Required'
                    }
                    placeholder="Password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyIcon className={classes.icons} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={handlePasswordVisibility}>
                                    {passwordVisibility ? (
                                        <VisibilityIcon
                                            className={classes.icons}
                                        />
                                    ) : (
                                        <VisibilityOffIcon
                                            className={classes.icons}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    type={passwordVisibility ? 'text' : 'password'}
                    label="Password"></TextField>
                <Box className={classes.buttonContainer}>
                    <Button
                        onClick={() => {
                            props.history.push('/auth/recovery')
                        }}
                        variant="outlined"
                        disabled={props.loading}
                        color="primary">
                        Forgot Password
                    </Button>
                    <Button
                        disabled={props.loading}
                        type="submit"
                        variant="contained"
                        color="primary">
                        <Typography style={{ color: 'white' }} variant="button">
                            Submit
                        </Typography>
                    </Button>
                </Box>
            </form>
            <Box className={classes.createNewAccountContainer}>
                <Button
                    onClick={() => {
                        props.history.push('/auth/signup')
                    }}
                    disabled={props.loading}
                    variant="text"
                    color="secondary">
                    <Typography style={{ textTransform: 'none' }}>
                        Create New Account ?
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default withAnimateAuth(withRouter(Login))
