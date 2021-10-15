import React, { useEffect, useState } from 'react'
import withAnimate from '../../hoc/animate'
import { withRouter } from 'react-router-dom'
import SubHeader from '../../components/SubHeader'
import Typography from '@material-ui/core/Typography'
import { motion } from 'framer-motion'
import ReactGA from 'react-ga'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import SnackBar from '../../components/SnackBar'
import axios from 'axios'
import { backend } from '../../config/httpClient'
import { CONTACTS } from '../../config/urls'
import { Button } from '@material-ui/core'
import { CONTACT } from '../../config/meta'
import MetaData from '../../components/MetaData'
import './styles.css'

const Contact = (props) => {
    const [data, setData] = useState({
        name: { value: '', error: '' },
        email: { value: '', error: '' },
        message: { value: '', error: '' },
        button: { disable: false },
        loading: false,
        snackBar: { message: '', open: false, severity: '' },
    })

    let handleNameChange = (event) => {
        setData({ ...data, name: { value: event.target.value, error: '' } })
    }
    let handleEmailChange = (event) => {
        setData({ ...data, email: { value: event.target.value, error: '' } })
    }
    let handleMessageChange = (event) => {
        setData({ ...data, message: { value: event.target.value, error: '' } })
    }
    let handleClose = () => {
        setData({
            ...data,
            snackBar: { ...data.snackBar, open: false },
        })
    }

    useEffect(() => {
        ReactGA.pageview('/contact/')
    }, [])

    let upload = () => {
        console.log()
        axios
            .get('https://apis.dncjgec.in/location/')
            .then((res) => {
                const { ip, longitude, latitude, country, region, city } =
                    res.data

                const d = {
                    ip,
                    longitude,
                    latitude,
                    name: data.name.value,
                    message: data.message.value,
                    email: data.email.value,
                    country,
                    region,
                    city,
                }

                backend
                    .post(CONTACTS, d)
                    .then((res) => {
                        setData({
                            name: { value: '', error: '' },
                            email: { value: '', error: '' },
                            message: { value: '', error: '' },
                            loading: false,
                            snackBar: {
                                message: 'We have received your message !',
                                open: true,
                                severity: 'success',
                            },
                            button: { disable: false },
                        })

                        ReactGA.event({
                            category: 'Contact Message',
                            action: 'Message Sent',
                        })
                    })
                    .catch((err) => {
                        ReactGA.exception({
                            description: err,
                            fatal: false,
                        })
                        setData({
                            ...data,
                            loading: false,
                            snackBar: {
                                message: 'Something went wrong !',
                                open: true,
                                severity: 'error',
                            },
                            button: { disable: false },
                        })
                    })
            })
            .catch((err) => {
                setData({
                    ...data,
                    loading: false,
                    snackBar: {
                        message: 'Something went wrong !',
                        open: true,
                        severity: 'error',
                    },
                    button: { disable: false },
                })
            })
    }

    let validate = () => {
        let obj = data
        let f = 0
        if (obj.name.value.length === 0 && obj.name.error === '') {
            obj.name.error = '* Required'
            f = 1
        }
        if (obj.email.value.length === 0 && obj.email.error === '') {
            obj.email.error = '* Required'
            f = 1
        }
        if (obj.message.value.length === 0 && obj.message.error === '') {
            obj.message.error = '* Required'
            f = 1
        }
        let mailformat =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!mailformat.test(obj.email.value) && obj.email.error === '') {
            obj.email.error = 'Valid email address required'
            f = 1
        }
        if (f) {
            setData({
                loading: false,
                snackBar: { value: '', appear: false },
                button: obj.button,
                name: obj.name,
                email: obj.email,
                message: obj.message,
            })
            return
        }
        setData({
            ...data,
            loading: true,
            button: { disable: true },
        })
        upload()
    }

    return (
        <div
            className="page-container"
            style={{ padding: '69px 0px 0px 0px', minHeight: '400px' }}>
            <MetaData data={CONTACT}></MetaData>
            <SubHeader
                title="Contact Us"
                onBack={() => props.history.goBack()}></SubHeader>
            <SnackBar
                message={data.snackBar.message}
                open={data.snackBar.open}
                handleClose={handleClose}
                severity={data.snackBar.severity}></SnackBar>
            <section
                className="contacts-container"
                style={{
                    height:
                        props.screenWidth < 1050
                            ? 'auto'
                            : 'calc(100vh - 140px)',
                }}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection:
                            props.screenWidth < 1050 ? 'column' : 'row',
                    }}>
                    <div
                        style={{
                            width: props.screenWidth < 1050 ? '95%' : '40%',
                            boxSizing: 'border-box',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                ease: 'easeOut',
                                duration: 1.3,
                                delay: 0.6,
                            }}
                            style={{
                                margin: '10px 0px',
                                width: '95%',
                                textAlign: 'center',
                            }}>
                            <Typography variant="h3">
                                We Would Like To Hear From You !
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                ease: 'easeOut',
                                duration: 1.3,
                                delay: 0.85,
                            }}
                            style={{
                                margin: '40px 0px',
                                width: '95%',
                                textAlign: 'center',
                            }}>
                            <Typography variant="h6" color="textSecondary">
                                Post suggestions/feedbacks or just reach to us
                                using the contact form.
                            </Typography>
                        </motion.div>
                    </div>
                    <div
                        style={{
                            width: props.screenWidth < 1050 ? '100%' : '60%',
                            boxSizing: 'border-box',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: -30 }}
                            transition={{
                                ease: 'easeOut',
                                duration: 1.1,
                                delay: 0.7,
                            }}
                            className="contact-card"
                            style={{
                                zIndex: '100',
                                minWidth: '250px',
                                maxWidth: '470px',
                                width: props.screenWidth < 1050 ? '90%' : '70%',
                                boxSizing: 'border-box',
                                padding: '20px 25px',
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',

                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                            }}>
                            {data.loading && (
                                <LinearProgress
                                    color="secondary"
                                    style={{
                                        position: 'absolute',
                                        top: '0px',
                                        width: '100%',
                                    }}
                                />
                            )}
                            <Typography
                                variant="h5"
                                gutterBottom
                                style={{ margin: '15px 0px' }}>
                                Contact Form
                            </Typography>

                            <Divider
                                style={{
                                    width: '93%',
                                    margin: '5px 0px 30px 0px',
                                }}></Divider>
                            <form>
                                <TextField
                                    onChange={handleNameChange}
                                    required
                                    value={data.name.value}
                                    helperText={data.name.error}
                                    variant="outlined"
                                    error={data.name.error.length !== 0}
                                    style={{ width: '93%', margin: '5px 0px' }}
                                    label="Full Name"></TextField>
                                <TextField
                                    onChange={handleEmailChange}
                                    required
                                    variant="outlined"
                                    type="email"
                                    error={data.email.error.length !== 0}
                                    helperText={data.email.error}
                                    value={data.email.value}
                                    style={{ width: '93%', margin: '5px 0px' }}
                                    label="Email"></TextField>
                                <TextField
                                    onChange={handleMessageChange}
                                    label="Message"
                                    multiline
                                    required
                                    error={data.message.error.length !== 0}
                                    helperText={data.message.error}
                                    value={data.message.value}
                                    style={{ width: '93%', margin: '5px 0px' }}
                                    rows={4}
                                    variant="outlined"
                                />
                                <Button
                                    onClick={validate}
                                    style={{
                                        width: '100px',
                                        margin: '5px 0px',
                                    }}
                                    disabled={data.button.disable}
                                    color="secondary"
                                    variant="contained">
                                    Send
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
                <svg
                    style={{
                        position: 'absolute',
                        bottom: '0px',
                        width:
                            props.screenWidth > 635
                                ? props.screenWidth > 1048
                                    ? '100%'
                                    : '300%'
                                : '500%',
                        zIndex: props.screenWidth > 1070 ? -1 : 2,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320">
                    <path
                        fill="#00a8ff"
                        fill-opacity="1"
                        d="M0,224L60,208C120,192,240,160,360,149.3C480,139,600,149,720,144C840,139,960,117,1080,90.7C1200,64,1320,32,1380,16L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </section>
        </div>
    )
}

export default withRouter(withAnimate(Contact))
