import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter, useParams } from 'react-router-dom'
import { withAnimateAuth } from '../../hoc/animateAuth'
import { useDispatch } from 'react-redux'
import { authLoading } from '../../store/auth'
import { apiInstance } from '../../config/httpClient'
import { PASSWORD_RESET } from '../../config/dynamic_urls'
import { setNotification } from '../../store/notification'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Hidden from '@material-ui/core/Hidden'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import InputAdornment from '@material-ui/core/InputAdornment'
import { IconButton } from '@material-ui/core'
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
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
        useState(false)

    const { id } = useParams()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        password: { value: '', error: '' },
        confirm_password: { value: '', error: '' },
    })

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

    const verify = () => {
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

            if (x === 0) {
                flag = 1
                newInput.password.error =
                    'Password must contain atleast 1 number'
            }
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

            if (!format.test(newInput.password.value)) {
                flag = 1
                newInput.password.error =
                    'Password must contain atleast 1 special character'
            }
        }

        if (input.confirm_password.value !== input.password.value) {
            flag = 1
            newInput.confirm_password.error =
                "Confirm Password doesn't match with password"
        }

        if (flag) {
            setInput(newInput)
            return false
        }

        return true
    }

    const handleSubmit = async () => {
        dispatch(authLoading(true))
        if (!verify()) {
            dispatch(authLoading(false))
            return
        }
        try {
            const body = {
                confirm_password: input.confirm_password.value,
                token: id,
                password: input.password.value,
            }
            const data = await apiInstance.put(PASSWORD_RESET, body)
            dispatch(
                setNotification({
                    message: ' Password has been reset!',
                    severity: 'success',
                })
            )
            dispatch(authLoading(false))
            props.history.push('/auth')
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

    const handlePasswordVisibility = () => {
        const newValue = !passwordVisibility
        setPasswordVisibility(newValue)
    }
    const handleConfirmPasswordVisibility = () => {
        const newValue = !passwordConfirmVisibility
        setPasswordConfirmVisibility(newValue)
    }

    return (
        <Box className={classes.container}>
            <Hidden xsDown>
                <div style={{ height: '22vh' }}></div>
            </Hidden>
            <Typography gutterBottom variant="h2" className={classes.heading}>
                Password Reset
            </Typography>
            <Divider className={classes.divider}></Divider>
            <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                style={{ marginBottom: '20px' }}>
                Reset your password.
            </Typography>
            <form
                id="reset_form"
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(e)
                }}
                prevent>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    name="password"
                    value={input.password.value}
                    error={input.password.error}
                    onChange={handleChange}
                    helperText={
                        input.password.error
                            ? input.password.error
                            : '*Required'
                    }
                    placeholder="New Password"
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
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    name="confirm_password"
                    value={input.confirm_password.value}
                    error={input.confirm_password.error}
                    onChange={handleChange}
                    helperText={
                        input.confirm_password.error
                            ? input.confirm_password.error
                            : '*Required'
                    }
                    type={passwordConfirmVisibility ? 'text' : 'password'}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyIcon className={classes.icons} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    onClick={handleConfirmPasswordVisibility}>
                                    {passwordConfirmVisibility ? (
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
                    }}></TextField>
                <Box className={classes.buttonContainer}>
                    <Button type="submit" variant="contained" color="primary">
                        <Typography style={{ color: 'white' }} variant="button">
                            Submit
                        </Typography>
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default withAnimateAuth(withRouter(Login))
