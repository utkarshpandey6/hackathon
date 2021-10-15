import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { logout } from '../../store/auth'
import { setNotification } from '../../store/notification'
import { useDispatch } from 'react-redux'
import { ListItemAvatar, Box } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ResourceIcon from '@material-ui/icons/LocalLibrary'
import EventIcon from '@material-ui/icons/Event'
import GalleryIcon from '@material-ui/icons/PhotoLibrary'
import AlumniIcon from '@material-ui/icons/SupervisedUserCircle'
import HomeIcon from '@material-ui/icons/Home'
import BlogIcon from '@material-ui/icons/Assignment'
import LogInIcon from '@material-ui/icons/Lock'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import theme from '../../config/theme'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Popover from '@material-ui/core/Popover'
import { motion, useAnimation } from 'framer-motion'
import MenuIcon from '@material-ui/icons/Menu'
import Logo from '../../assets/images/Logo.png'
import LinearProgress from '@material-ui/core/LinearProgress'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import './styles.css'

import { Avatar, Button, Typography } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
        transition: 'all linear 200ms',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    avatarDrawer: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
    },
    profileavatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginBottom: theme.spacing(2),
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
    },
    popperContainer: {
        width: '250px',
    },
    popperHead: {
        padding: '25px 15px 5px 15px',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    popperList: {
        width: '100%',
        maxWidth: 360,
        outline: 'none',
        backgroundColor: theme.palette.background.paper,
    },

    list: {
        width: 250,
    },
    popper: {
        padding: theme.spacing(2),
    },
}))
let Header = (props) => {
    let control = useAnimation()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const Anchor = 'right'
    const classes = useStyles()
    const [drawerstate, setDrawerState] = useState(false)
    const dispatch = useDispatch()
    let links = [
        { name: 'Resources', route: '/resources', Icon: ResourceIcon },
        { name: 'Events', route: '/events', Icon: EventIcon },
        { name: 'Blogs', route: '/blog', Icon: GalleryIcon },
        { name: 'Gallery', route: '/gallery', Icon: GalleryIcon },
        { name: 'Alumni', route: '/alumni', Icon: AlumniIcon },
        { name: 'Contact Us', route: '/contact', Icon: ContactSupportIcon },
    ]
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    let handleLogout = () => {
        handleClose()
        localStorage.removeItem('accessToken')
        dispatch(logout())
        dispatch(
            setNotification({
                message: 'Logged Out Successfully !',
                severity: 'success',
            })
        )
    }

    let variant = {
        top: {
            boxShadow: '0px 0px 0px 0px ' + theme.color.primary,
            transition: {
                duration: 0.2,
                ease: 'easeOut',
            },
        },
        down: {
            boxShadow: '0px 0px 8px 0px ' + theme.color.primary,
            transition: {
                duration: 0.2,
                ease: 'easeOut',
            },
        },
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY <= 4) control.start(variant.top)
            else if (window.scrollY >= 4) control.start(variant.down)
        })
    }, [control, variant.top, variant.down])

    const routeTo = (route) => {
        if (route === props.history.location.pathname) return
        props.history.push(route)
    }

    const list = () => (
        <div
            className={classes.list}
            role="navigation"
            onKeyDown={toggleDrawer(false)}>
            <div className="drawer-logo-container">
                <img alt="DnC logo" src={Logo} className="drawer-logo"></img>
            </div>

            <List>
                {props.user && (
                    <ListItem
                        onClick={() => {
                            routeTo('/profile')
                            setDrawerState(false)
                        }}
                        button
                        key={'profile'}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatarDrawer}>U</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography
                            primary={<Typography>Profile</Typography>}
                        />
                    </ListItem>
                )}
                <ListItem
                    onClick={() => {
                        routeTo('/')
                        setDrawerState(false)
                    }}
                    button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
                {links.map((val, ind) => (
                    <ListItem
                        onClick={() => {
                            props.history.push(val.route)
                            setDrawerState(false)
                        }}
                        button
                        key={val.name}>
                        <ListItemIcon>
                            <val.Icon />
                        </ListItemIcon>
                        <ListItemText primary={val.name} />
                    </ListItem>
                ))}
                {!props.user ? (
                    <ListItem
                        onClick={() => {
                            routeTo('/auth')
                            setDrawerState(false)
                        }}
                        disabled={props.userLoading}
                        button
                        key={'login'}>
                        <ListItemIcon>
                            <LogInIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography color="secondary">
                                    Log In
                                </Typography>
                            }
                        />
                        {props.userLoading && (
                            <LinearProgress
                                color="secondary"
                                style={{
                                    width: '80%',
                                    height: '3px',
                                    position: 'absolute',
                                    bottom: '0px',
                                }}></LinearProgress>
                        )}
                    </ListItem>
                ) : (
                    <ListItem
                        disabled={props.userLoading}
                        button
                        key={'logout'}>
                        <ListItemIcon>
                            <ExitToAppIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography color="secondary">
                                    Log Out
                                </Typography>
                            }
                        />
                        {props.userLoading && (
                            <LinearProgress
                                color="secondary"
                                style={{
                                    width: '80%',
                                    height: '3px',
                                    position: 'absolute',
                                    bottom: '0px',
                                }}></LinearProgress>
                        )}
                    </ListItem>
                )}
            </List>
        </div>
    )

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }

        setDrawerState(open)
    }

    if (props.hidden) {
        return null
    }

    return (
        <motion.header className="header-container" animate={control}>
            <div className="logo-container">
                <img
                    onClick={() => routeTo('/')}
                    alt="logo"
                    title={'DnC Home'}
                    className="logo"
                    src={Logo}></img>
            </div>
            <div className="link-container">
                {props.screenWidth > 1080 ? (
                    <nav className="stroke">
                        {links.map((val) => (
                            <button
                                className="nav-button"
                                key={val.name}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                    //window.open(val.route, '_self')
                                    props.history.push(val.route)
                                }}>
                                {val.name}
                            </button>
                        ))}

                        {props.user && (
                            <div
                                style={{
                                    padding: '1px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Avatar
                                    aria-describedby={'popper-profile'}
                                    onClick={handleClick}
                                    className={classes.avatar}>
                                    {props.user.first_name[0]}
                                </Avatar>
                            </div>
                        )}
                        {!props.user && (
                            <Button
                                onClick={() => {
                                    routeTo('/auth')
                                }}
                                color="secondary"
                                disableElevation
                                disabled={props.userLoading}
                                style={{
                                    paddingLeft: '25px',
                                    paddingRight: '25px',
                                }}>
                                Log In
                                {props.userLoading && (
                                    <LinearProgress
                                        color="secondary"
                                        style={{
                                            width: '100%',
                                            height: '3px',
                                            position: 'absolute',
                                            bottom: '0px',
                                        }}></LinearProgress>
                                )}
                            </Button>
                        )}
                    </nav>
                ) : (
                    <IconButton onClick={toggleDrawer(true)} color="secondary">
                        <MenuIcon color="secondary" />
                    </IconButton>
                )}
            </div>
            <Popover
                id={'popper-profile'}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                {props.user && (
                    <Box className={classes.popperContainer}>
                        <Box className={classes.popperHead}>
                            <Avatar className={classes.profileavatar}>
                                {props.user.first_name[0]}
                            </Avatar>
                            <Typography
                                style={{
                                    fontWeight: '600',
                                }}>{`${props.user.first_name} ${props.user.last_name}`}</Typography>
                        </Box>
                        <List component="nav" className={classes.popperList}>
                            <ListItem
                                button
                                onClick={() => {
                                    handleClose()
                                    routeTo('/profile')
                                }}>
                                <ListItemIcon>
                                    <AccountBoxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                            <ListItem button onClick={handleLogout}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItem>
                        </List>
                    </Box>
                )}
            </Popover>
            <SwipeableDrawer
                anchor={Anchor}
                open={drawerstate}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}>
                {list()}
            </SwipeableDrawer>
        </motion.header>
    )
}

export default withRouter(Header)
