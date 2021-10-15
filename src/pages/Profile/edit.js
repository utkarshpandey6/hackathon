import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import {
    DialogActions,
    DialogTitle,
    DialogContent,
    TextField,
    DialogContentText,
    Typography,
    IconButton,
    Button,
    LinearProgress,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { update } from '../../store/auth'
import { setNotification } from '../../store/notification'
import { useDispatch } from 'react-redux'
import { apiInstance } from '../../config/httpClient'
import { PROFILE_UPDATE } from '../../config/dynamic_urls'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: 'white',
    },
}))
function Edit(props) {
    const { user, onClose } = props
    const [input, setInput] = useState({
        first_name: { value: user.first_name, error: null },
        last_name: { value: user.last_name, error: null },
        organization: { value: user.organization, error: null },
    })
    const [loading, setloading] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleUpdate = async () => {
        try {
            setloading(true)
            const { first_name, last_name, organization } = input
            const body = {
                first_name: first_name.value,
                last_name: last_name.value,
                organization: organization.value,
            }
            const data = await apiInstance.put(PROFILE_UPDATE, body)
            setloading(false)
            dispatch(update({ ...data.data }))
            dispatch(
                setNotification({
                    message: 'Your profile is update!',
                    severity: 'success',
                })
            )
            props.onClose()
        } catch (err) {
            setloading(false)
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
        <Dialog open={props.open}>
            <DialogTitle className={classes.header}>
                <Typography variant="h6">Edit Profile</Typography>
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}

                {loading && (
                    <LinearProgress
                        style={{
                            width: '100%',
                            position: 'absolute',
                            bottom: '0px',
                            zIndex: '32',
                            left: '0px',
                        }}
                        color="secondary"></LinearProgress>
                )}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>Please edit your profile.</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    disabled={loading}
                    onChange={handleChange}
                    value={input.first_name.value}
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="last_name"
                    disabled={loading}
                    name="last_name"
                    onChange={handleChange}
                    value={input.last_name.value}
                    label="Last Name"
                    fullWidth
                />
                <TextField
                    autoFocus
                    name="organization"
                    margin="dense"
                    disabled={loading}
                    onChange={handleChange}
                    value={input.organization.value}
                    id="organization"
                    label="Organization"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={loading}
                    color="secondary"
                    onClick={props.onClose}>
                    Cancel{' '}
                </Button>
                <Button
                    disabled={loading}
                    color="primary"
                    onClick={handleUpdate}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Edit
