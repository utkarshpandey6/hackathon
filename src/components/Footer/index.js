import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FacebookIcon from '@material-ui/icons/Facebook'
import { withRouter } from 'react-router-dom'
import InstagramIcon from '@material-ui/icons/Instagram'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import CodeIcon from '@material-ui/icons/Code'

import TwitterIcon from '@material-ui/icons/Twitter'
import { motion } from 'framer-motion'
import Typography from '../Typography'
import college_logo from '../../assets/images/college_logo.png'
import './styles.css'
let Footer = (props) => {
    const navLinks = [
        { name: 'Events', url: 'events' },
        { name: 'Gallery', url: 'gallery' },
        { name: 'Alumni', url: 'alumni' },
        { name: 'Video Tutorials', url: 'resources/videotutorials' },
        { name: 'Practice', url: 'resources/practice' },
        { name: 'Online IDE', url: 'resources/ide' },
        { name: 'Contact Us', url: 'contact' },
    ]

    if (props.hidden) return null

    return (
        <section className="footer-container">
            <div
                className="footer-links-container"
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: props.screenWidth < 1024 ? '5px' : '40px',
                }}>
                <div
                    className="footer-links-container"
                    style={{
                        padding: '5px',
                        width: 'auto',

                        minWidth: '139px',
                    }}>
                    <Typography color="white" style={{ margin: '7px 0px' }}>
                        Navigation Links :
                    </Typography>
                    <div className="footer-links">
                        <ul>
                            {navLinks.map((val) => (
                                <li key={val.name}>
                                    <Link href={val.url}>
                                        <Typography
                                            color="white"
                                            className="footer-links-text">
                                            {val.name}
                                        </Typography>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {props.screenWidth <= 1024 && (
                    <div
                        className="footer-links-container"
                        style={{
                            padding: '5px',
                            width: 'auto',
                            minWidth: '139px',
                            alignItems: 'flex-start',
                        }}>
                        <Typography color="white" style={{ margin: '7px 0px' }}>
                            Contact Us
                        </Typography>
                        <Typography
                            style={{ margin: '1px 0px' }}
                            color="white"
                            type="body2">
                            Address : Jalpaiguri , West Bengal
                        </Typography>
                        <Typography
                            style={{ margin: '1px 0px' }}
                            color="white"
                            type="body2">
                            Email : codersjgec@gmail.com
                        </Typography>
                        <Typography
                            style={{ margin: '1px 0px' }}
                            color="white"
                            type="body2">
                            College Website : jgec.ac.in
                        </Typography>
                    </div>
                )}
            </div>
            <div className="footer-center-container">
                <img
                    src={college_logo}
                    alt="college_logo"
                    className="footer-college-logo"></img>
                <Typography
                    type="overline"
                    color="white"
                    className="footer-right-text">
                    © 2020 DnC JGEC, All Rights Reserved
                </Typography>
                <div className="footer-icon-container">
                    <IconButton>
                        <FacebookIcon className="facebook" />
                    </IconButton>
                    <IconButton>
                        <TwitterIcon className="twitter" />
                    </IconButton>
                    <IconButton>
                        <InstagramIcon className="instagram" />
                    </IconButton>
                    <IconButton>
                        <CodeIcon className="code" />
                    </IconButton>
                </div>
                <Typography
                    type="overline"
                    color="white"
                    className="footer-made-text">
                    Made with
                    <motion.div
                        animate={{ scale: 0.8 }}
                        transition={{
                            repeat: 'Infinity',
                            repeatType: 'reverse',
                            duration: 0.8,
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0px 5px 0px 5px',
                        }}>
                        <FavoriteIcon
                            style={{
                                color: '#e31b23',
                            }}
                        />
                    </motion.div>
                    by
                    <Link
                        href="https://www.pandeyutkarsh.com/"
                        target="__blank">
                        <Typography
                            type="overline"
                            color="white"
                            style={{ margin: '0px 0px 0px 3px' }}
                            className="footer-made-text">
                            Utkarsh
                        </Typography>
                    </Link>
                </Typography>
            </div>
            <div className="footer-links-container">
                {props.screenWidth > 1024 && (
                    <div
                        className="footer-links-container"
                        style={{
                            padding: '5px',
                            width: 'auto',
                            minWidth: '139px',
                            alignItems: 'flex-start',
                        }}>
                        <Typography color="white" style={{ margin: '7px 0px' }}>
                            Contact Us
                        </Typography>
                        <Typography
                            style={{ margin: '1px 0px' }}
                            color="white"
                            type="body2">
                            Address : Jalpaiguri , West Bengal
                        </Typography>
                        <Typography
                            style={{ margin: '1px 0px' }}
                            color="white"
                            type="body2">
                            Email :{' '}
                            <Link
                                href="mailto: codersjgec@gmail.com"
                                style={{ color: 'white' }}>
                                codersjgec@gmail.com
                            </Link>
                        </Typography>
                        <Typography
                            style={{ margin: '1px 0px' }}
                            color="white"
                            type="body2">
                            College Website :{' '}
                            <Link
                                href="https://jgec.ac.in/"
                                target="__blank"
                                style={{ color: 'white' }}>
                                jgec.ac.in
                            </Link>
                        </Typography>
                    </div>
                )}
            </div>
        </section>
    )
}

export default withRouter(Footer)
