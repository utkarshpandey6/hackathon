import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { useTheme } from '@material-ui/core/styles'
function TransitionUp(props) {
    return <Slide {...props} direction="right" />
}

function Snack(props) {
    const theme = useTheme()
    let color = theme.palette.primary.main
    if (props.severity === 'success') color = theme.palette.success.main
    if (props.severity === 'error') color = theme.palette.error.main
    if (props.severity === 'warning') color = theme.palette.warning.main
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={props.open}
            onClose={props.handleClose}
            autoHideDuration={props.timeout ? props.timeout : 4000}
            TransitionComponent={TransitionUp}
            key={'message'}>
            <SnackbarContent
                style={{ backgroundColor: color, color: 'white' }}
                message={props.message}></SnackbarContent>
        </Snackbar>
    )
}

export default Snack
