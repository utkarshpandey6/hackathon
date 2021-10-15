import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import './styles.css'
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
        },
    })
)

export default function SimpleBackdrop(props) {
    const classes = useStyles()

    return (
        <Backdrop
            className={classes.backdrop + ' backdrop-container'}
            {...props}
            style={{
                zIndex: 1310,
                backgroundColor: 'rgba(0,0,0,0.75)',
            }}>
            <div className="backdrop-close-icon-button">
                <IconButton
                    onClick={() => {
                        props.handleClose()
                    }}>
                    <CloseIcon
                        style={{ fontSize: '40px' }}
                        className="backdrop-close-icon"
                    />
                </IconButton>
            </div>
            {props.children}
        </Backdrop>
    )
}
