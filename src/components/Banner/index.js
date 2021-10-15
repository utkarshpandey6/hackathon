import React from 'react'
import { motion } from 'framer-motion'
import Svg from '../BouncingSVG'
import code from '../../assets/illustrations/code.svg'
import code_1 from '../../assets/illustrations/code_1.svg'
import theme from '../../config/theme'
export default (props) => {
    const firstName = {
        hidden: {
            y: 0,
        },
        visible: {
            y: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
                staggerDirection: -1,
            },
        },
    }

    const amp = {
        hidden: {
            y: 200,
        },
        visible: {
            y: 0,
            transition: {
                duration: 1.4,
                ease: 'easeOut',
            },
        },
    }

    const lastName = {
        hidden: {
            y: 0,
        },
        visible: {
            y: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
                staggerDirection: 1,
            },
        },
    }

    const letter = {
        hidden: {
            y: 400,
        },
        visible: {
            y: 0,
            transition: {
                duration: 1,

                ease: [0.6, 0.01, -0.05, 0.9],
            },
        },
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                minHeight: '420px',
                position: 'relative',
                display: 'flex',
                flexDirection: props.screenWidth > 1070 ? 'row' : 'column',
            }}>
            <svg
                style={{
                    position: 'absolute',
                    bottom: '0px',
                    zIndex: props.screenWidth > 1070 ? -1 : 2,
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320">
                <path
                    fill={theme.color.primary}
                    fillOpacity="1"
                    d="M0,32L120,80C240,128,480,224,720,245.3C960,267,1200,213,1320,186.7L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
            {props.screenWidth > 1080 ? (
                <Svg
                    alt="code_1"
                    style={{
                        position: 'absolute',
                        bottom: '10vh',
                        right: '30px',
                        width: '15%',
                        height: 'auto',
                    }}
                    duration={1.1}
                    bounce={true}
                    src={code_1}></Svg>
            ) : null}
            <img
                alt="coder's"
                style={{
                    height: props.screenWidth > 1070 ? 'auto' : '55%',
                    width: props.screenWidth > 1070 ? '40%' : 'auto',
                    margin:
                        props.screenWidth > 1070
                            ? '20px 5px 0px 15px'
                            : '69px 8px 10px 8px',
                    display: 'flex',

                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                src={code}></img>
            <div
                style={{
                    width: props.screenWidth > 1070 ? '55%' : '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent:
                        props.screenWidth > 1070 ? 'center' : 'flex-start',

                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <motion.div
                    style={{
                        width: '85%',
                        marginTop:
                            props.screenWidth > 1070
                                ? '0px'
                                : props.screenWidth > 800
                                ? '8%'
                                : '10%',
                        fontSize:
                            props.screenWidth > 1070
                                ? '5vw'
                                : props.screenWidth > 800
                                ? '65px'
                                : '9vw',
                        fontFamily: "'Josefin Sans', sans-serif",
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: props.screenWidth > 1070 ? '100vw' : '605px',
                    }}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={firstName}
                        style={{ display: 'flex' }}>
                        <motion.div variants={letter}>D</motion.div>
                        <motion.div variants={letter}>i</motion.div>
                        <motion.div variants={letter}>v</motion.div>
                        <motion.div variants={letter}>i</motion.div>
                        <motion.div variants={letter}>d</motion.div>
                        <motion.div variants={letter}>e</motion.div>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={amp}
                        style={{ margin: '0px 20px' }}>
                        &amp;
                    </motion.div>
                    <motion.div
                        animate="visible"
                        initial="hidden"
                        variants={lastName}
                        style={{ display: 'flex' }}>
                        <motion.div variants={letter}>C</motion.div>
                        <motion.div variants={letter}>o</motion.div>
                        <motion.div variants={letter}>n</motion.div>
                        <motion.div variants={letter}>q</motion.div>
                        <motion.div variants={letter}>u</motion.div>
                        <motion.div variants={letter}>e</motion.div>
                        <motion.div variants={letter}>r</motion.div>
                    </motion.div>
                </motion.div>
                <div
                    style={{
                        height: '3px',
                        backgroundColor: '#2f3640',
                        width: props.screenWidth > 1070 ? '90%' : '80%',
                    }}></div>
                <div
                    style={{
                        fontSize: props.screenWidth > 1070 ? '1.5vw' : '2.5vh',
                        margin: '5px',
                        color: '#2f3542',
                        fontFamily: "'Roboto',sans-serif",
                        fontWeight: '300',
                        letterSpacing: '0.8vw',
                    }}>
                    Coder's Club Of JGEC
                </div>
            </div>
        </div>
    )
}
