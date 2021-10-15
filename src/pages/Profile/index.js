import React, { useState } from 'react'
import MetaData from '../../components/MetaData'
import withAnimate from '../../hoc/animate'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import Loading from '../../components/Loading'
import { useSelector } from 'react-redux'
import { Redirect, withRouter } from 'react-router'
import { buildMeta } from '../../config/meta'
import Edit from './edit'
import Verify from './verify'
import ChangePassword from './changePassword'
import { Avatar, Typography, Divider, Button } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: '20px 20px',
        position: 'relative',
    },
    avatarContainer: {
        display: 'flex',
        flex: '1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        display: 'flex',
        flex: '1',
        height: 'fit-content',
        boxSizing: 'border-box',
        padding: '20px 10px',
    },
    detailsContainer: {
        display: 'flex',
        flex: '4',
        textAlign: 'left',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px 15px',
    },
    avatar: {
        width: '200px',
        height: '200px',
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
    },
    buttonContainer: {
        padding: '15px 0px',
    },
    button: {
        margin: '1px 16px 1px 0px',
    },
}))
const Profile = (props) => {
    const classes = useStyles(props)
    const user = useSelector((state) => state.auth.user)
    const userLoading = useSelector((state) => state.auth.loading)
    const [edit, setEdit] = useState(false)
    const [verify, setVerify] = useState(false)
    const [change_password, setChangePassword] = useState(false)
    const calcDate = (date1, date2) => {
        var diff = Math.floor(date1.getTime() - date2.getTime())
        var day = 1000 * 60 * 60 * 24

        var days = Math.floor(diff / day)
        var months = Math.floor(days / 31)
        var years = Math.floor(months / 12)

        var message = date2.toDateString()
        if (years) {
            return `Joined : ${years} year(s) ago`
        }
        if (months) {
            return `Joined : ${months} month(s) ago`
        }
        if (days) {
            return `Joined : ${days} day(s) ago`
        }
        return 'Joined : Recently'
    }

    const handleEditToggle = () => {
        const status = !edit
        setEdit(status)
    }
    const handleChangePasswordToggle = () => {
        const status = !change_password
        setChangePassword(status)
    }
    const handleVerifyToggle = () => {
        const status = !verify
        setVerify(status)
    }

    const component = () => {
        return (
            <div className={classes.container}>
                <IconButton
                    onClick={() => {
                        props.history.goBack()
                    }}
                    color="secondary"
                    style={{ position: 'absolute', top: '10px', left: '25px' }}>
                    <ArrowBackIcon
                        color="secondary"
                        style={{ fontSize: '30' }}
                    />
                </IconButton>
                <div className={classes.profileContainer}>
                    <div className={classes.avatarContainer}>
                        <Avatar className={classes.avatar}>
                            <Typography variant="h1">
                                {user.first_name[0]}
                            </Typography>
                        </Avatar>
                    </div>
                    <div className={classes.detailsContainer}>
                        <Typography
                            gutterBottom
                            variant="h4"
                            style={{
                                fontWeight: '600',
                            }}>
                            {`${user.first_name} ${user.last_name}`}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h6"
                            style={{ fontStyle: 'italics' }}>
                            {`Username : ${user.username}`}
                        </Typography>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <Typography
                                gutterBottom
                                variant="body1">{`${user.email}`}</Typography>
                            {!user.verified && (
                                <Button
                                    color="secondary"
                                    onClick={handleVerifyToggle}
                                    variant="outlined"
                                    style={{ margin: '0px 10px' }}>
                                    Verify
                                </Button>
                            )}
                        </div>
                        <Typography
                            gutterBottom
                            variant="body1">{`Organization : ${user.organization}`}</Typography>
                        <Typography gutterBottom variant="body1">{`${calcDate(
                            new Date(),
                            new Date(user.joined_on)
                        )}`}</Typography>
                        <div className={classes.buttonContainer}>
                            <Button
                                className={classes.button}
                                color="primary"
                                onClick={handleEditToggle}
                                variant="contained">
                                <Typography
                                    style={{ color: 'white' }}
                                    variant="button">
                                    Edit Profile
                                </Typography>
                            </Button>
                            <Button
                                onClick={handleChangePasswordToggle}
                                className={classes.button}
                                color="primary"
                                variant="outlined">
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
                <Divider
                    style={{ width: '100%', height: '2px', marginTop: '15px' }}
                />
                <Edit onClose={handleEditToggle} open={edit} user={user}></Edit>
                <ChangePassword
                    onClose={handleChangePasswordToggle}
                    open={change_password}
                    user={user}></ChangePassword>
                {!user.verified && (
                    <Verify
                        onClose={handleVerifyToggle}
                        open={verify}
                        user={user}></Verify>
                )}
            </div>
        )
    }

    return (
        <div className="page-container">
            {userLoading ? (
                <MetaData
                    data={buildMeta(
                        `Loading`,
                        'View and edit personal user profile.'
                    )}></MetaData>
            ) : (
                user && (
                    <MetaData
                        data={buildMeta(
                            `${user.first_name} ${user.last_name}`,
                            'View and edit personal user profile.'
                        )}></MetaData>
                )
            )}

            {userLoading ? (
                <Loading message="Fetching User ...."></Loading>
            ) : user === null ? (
                <Redirect to="/auth" />
            ) : (
                component()
            )}
        </div>
    )
}

export default withAnimate(withRouter(Profile))
