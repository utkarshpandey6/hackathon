import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import {
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography,
    IconButton,
    Button,
    LinearProgress,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { setNotification } from '../../store/notification'
import { useDispatch } from 'react-redux'
import { apiInstance } from '../../config/httpClient'
import { SEND_VERIFICATION } from '../../config/dynamic_urls'
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

    const [loading, setloading] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleReset = async () => {
        try {
            setloading(true)
            const { first_name, last_name, email } = user
            const body = { first_name, last_name, email }
            await apiInstance.post(SEND_VERIFICATION, body)
            dispatch(
                setNotification({
                    message: `Check your mail inbox, verification link has been sent.`,
                    severity: 'success',
                })
            )
            setloading(false)
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

    return (
        <Dialog open={props.open}>
            <DialogTitle className={classes.header}>
                <Typography variant="h6">Verification</Typography>
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
                <DialogContentText>
                    We will send you a verification link to your registered
                    email, which you can use to verify your email.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={loading}
                    color="secondary"
                    onClick={props.onClose}>
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    color="primary"
                    onClick={handleReset}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Edit
