import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withAnimateAuth } from '../../hoc/animateAuth'
import { useDispatch } from 'react-redux'
import { authLoading, setUser } from '../../store/auth'
import { apiInstance } from '../../config/httpClient'
import { SIGNUP, PROFILE } from '../../config/dynamic_urls'
import { setNotification } from '../../store/notification'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Hidden from '@material-ui/core/Hidden'
import InputAdornment from '@material-ui/core/InputAdornment'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import BusinessIcon from '@material-ui/icons/Business'
import DetailsIcon from '@material-ui/icons/Details'

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
    link: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
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
    icons: {
        color: theme.palette.text.secondary,
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

        display: 'flex',
        flexWrap: 'row',

        justifyContent: 'space-between',
        margin: '15px 0px 60px 0px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    twoTextField: {
        width: '60%',
        margin: '10px 0px',
        display: 'flex',
        flexWrap: 'row',

        justifyContent: 'space-between',

        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    createNewAccountContainer: {
        width: '60%',
        marginTop: '25px',
        display: 'flex',
        flexWrap: 'row',

        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
}))

function SignUp(props) {
    const classes = useStyles(props)
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
        useState(false)

    const [input, setInput] = useState({
        username: { value: '', error: null },
        password: { value: '', error: null },
        organization: { Value: '', error: null },
        email: { value: '', error: null },
        first_name: { value: '', error: null },
        last_name: { value: '', error: null },
        confirm_password: { value: '', error: null },
        organization: { value: '', error: null },
    })
    const dispatch = useDispatch()
    const [checked, setChecked] = React.useState(true)

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked)
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
    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }
    const isAlphaNum = (str) => {
        const re = /^[a-z0-9]+$/i
        return re.test(str)
    }

    const handelVerify = () => {
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
        if (
            input.first_name.value.length < 2 ||
            input.first_name.value.length > 15
        ) {
            flag = 1
            newInput.first_name.error =
                'First name length should in range [2, 15]'
        }
        if (
            input.last_name.value.length < 2 ||
            input.last_name.value.length > 15
        ) {
            flag = 1
            newInput.last_name.error =
                'Last name length should in range [2, 15]'
        }
        if (!isAlphaNum(input.username.value)) {
            flag = 1
            newInput.username.error = 'Username should be alphanumeric'
        }
        if (
            input.username.value.length < 3 ||
            input.username.value.length > 14
        ) {
            flag = 1
            newInput.username.error = 'Username length should in range [2, 14]'
        }

        if (!validateEmail(input.email.value)) {
            flag = 1
            newInput.email.error = 'Invalid Email'
        }

        if (
            input.organization.value.length < 3 ||
            input.organization.value.length > 50
        ) {
            flag = 1
            newInput.organization.error =
                'Organization length should in range [2, 50]'
        }

        if (flag) {
            setInput(newInput)
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        dispatch(authLoading(true))
        if (!handelVerify()) {
            dispatch(authLoading(false))
            return
        }
        try {
            const body = {
                username: input.username.value,
                confirm_password: input.confirm_password.value,
                organization: input.organization.value,
                email: input.email.value,
                first_name: input.first_name.value,
                last_name: input.last_name.value,
                password: input.password.value,
            }
            const data = await apiInstance.post(SIGNUP, body)
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
            props.history.push('/auth')
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
    const handleConfirmPasswordVisibility = () => {
        const newValue = !passwordConfirmVisibility
        setPasswordConfirmVisibility(newValue)
    }
    return (
        <Box className={classes.container}>
            <Hidden xsDown>
                <div style={{ height: '12vh' }}></div>
            </Hidden>
            <Typography gutterBottom variant="h2" className={classes.heading}>
                Sign Up
            </Typography>
            <Divider className={classes.divider}></Divider>
            <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                style={{ marginBottom: '20px' }}>
                Register Yourself !
            </Typography>
            <form
                id="signup_form"
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
                <Box className={classes.twoTextField}>
                    <TextField
                        style={{
                            marginRight: '5px',
                            textTransform: 'capitalize',
                        }}
                        className={classes.textField}
                        variant="outlined"
                        label="First Name"
                        onChange={handleChange}
                        value={input.first_name.value}
                        error={Boolean(input.first_name.error)}
                        helperText={
                            input.first_name.error
                                ? input.first_name.error
                                : '*Required'
                        }
                        placeholder="First Name"
                        name="first_name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DetailsIcon className={classes.icons} />
                                </InputAdornment>
                            ),
                        }}></TextField>
                    <TextField
                        style={{
                            marginLeft: '5px',
                            textTransform: 'capitalize',
                        }}
                        className={classes.textField}
                        variant="outlined"
                        label="Last Name"
                        name="last_name"
                        onChange={handleChange}
                        value={input.last_name.value}
                        error={Boolean(input.last_name.error)}
                        helperText={
                            input.last_name.error
                                ? input.last_name.error
                                : '*Required'
                        }
                        placeholder="Last Name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DetailsIcon className={classes.icons} />
                                </InputAdornment>
                            ),
                        }}></TextField>
                </Box>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    value={input.username.value}
                    error={Boolean(input.username.error)}
                    helperText={
                        input.username.error
                            ? input.username.error
                            : '*Required'
                    }
                    placeholder="Username"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon className={classes.icons} />
                            </InputAdornment>
                        ),
                    }}></TextField>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={input.email.value}
                    error={Boolean(input.email.error)}
                    helperText={
                        input.email.error ? input.email.error : '*Required'
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon className={classes.icons} />
                            </InputAdornment>
                        ),
                    }}></TextField>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    label="Organization"
                    name="organization"
                    onChange={handleChange}
                    placeholder="Organization"
                    value={input.organization.value}
                    error={Boolean(input.organization.error)}
                    helperText={
                        input.organization.error
                            ? input.organization.error
                            : '*Required'
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BusinessIcon className={classes.icons} />
                            </InputAdornment>
                        ),
                    }}></TextField>

                <Box
                    className={classes.twoTextField}
                    style={{ flexWrap: 'wrap' }}>
                    <TextField
                        style={{
                            marginRight: '5px',
                            flex: '1',
                            minWidth: '200px',
                            display: 'flex',
                        }}
                        className={classes.textField}
                        variant="outlined"
                        type={passwordVisibility ? 'text' : 'password'}
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        value={input.password.value}
                        error={Boolean(input.password.error)}
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
                                    <IconButton
                                        onClick={handlePasswordVisibility}>
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
                        }}></TextField>
                    <TextField
                        style={{
                            marginLeft: '5px',
                            flex: '1',
                            minWidth: '200px',
                            display: 'flex',
                        }}
                        className={classes.textField}
                        variant="outlined"
                        name="confirm_password"
                        type={passwordConfirmVisibility ? 'text' : 'password'}
                        label="Confirm Password"
                        onChange={handleChange}
                        value={input.confirm_password.value}
                        error={Boolean(input.confirm_password.error)}
                        helperText={
                            input.confirm_password.error
                                ? input.confirm_password.error
                                : '*Required'
                        }
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
                                        onClick={
                                            handleConfirmPasswordVisibility
                                        }>
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
                </Box>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                required={true}
                                onChange={handleChangeChecked}
                                name="checkedA"
                            />
                        }
                        label={<Typography>I accept</Typography>}
                    />
                    <Link className={classes.link}>Terms and Conditions</Link>
                </Box>

                <Box className={classes.buttonContainer}>
                    <Button
                        variant="text"
                        color="secondary"
                        disabled={props.loading}
                        onClick={() => {
                            props.history.push('/auth')
                        }}
                        style={{ minWidth: 'fit-content' }}>
                        <Typography style={{ textTransform: 'none' }}>
                            Already Have an Account ?
                        </Typography>
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
        </Box>
    )
}

export default withAnimateAuth(withRouter(SignUp))
