import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import theme from '../../config/theme'
export default (props) => {
    let type = props.type ? props.type : 'body1'
    let textcolor = props.color ? props.color : theme.color.textPrimary
    let [ref, inView] = useInView({
        triggerOnce: true,
        threshold: props.threshold ? props.threshold : 0.4,
    })
    let control = useAnimation()
    let animationType = props.animation ? props.animation : 'none'
    let animations = {
        none: {
            hidden: {},
            visible: {},
        },
        fade: {
            hidden: {
                opacity: 0,
                transition: {
                    duration: 0,
                },
            },
            visible: {
                opacity: 1,
                transition: {
                    duration: props.duration ? props.duration : 0.8,
                    ease: 'easeInOut',
                    delay: props.delay,
                },
            },
        },
        slide_in: {
            hidden: {
                opacity: 0,
                y: '100px',
                transition: {
                    duration: 0,
                },
            },
            visible: {
                opacity: 1,
                y: '0px',
                transition: {
                    duration: props.duration ? props.duration : 0.8,
                    ease: 'easeOut',
                    delay: props.delay,
                },
            },
        },
        slide_left: {
            hidden: {
                opacity: 0,
                x: '100px',
                transition: {
                    duration: 0,
                },
            },
            visible: {
                opacity: 1,
                x: '0px',
                transition: {
                    duration: props.duration ? props.duration : 0.8,
                    ease: 'easeInOut',
                    delay: props.delay,
                },
            },
        },
        slide_right: {
            hidden: {
                opacity: 0,
                x: '-100px',
                transition: {
                    duration: 0,
                },
            },
            visible: {
                opacity: 1,
                x: '0px',
                transition: {
                    duration: props.duration ? props.duration : 0.8,
                    ease: 'easeInOut',
                    delay: props.delay,
                },
            },
        },
        scale: {
            hidden: {
                opacity: 0,
                scale: 0.9,
                transition: {
                    duration: 0,
                },
            },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: props.duration ? props.duration : 0.8,
                    ease: 'easeInOut',
                    delay: props.delay,
                },
            },
        },
    }

    useEffect(() => {
        control.start(
            animations[animationType]
                ? animations[animationType].hidden
                : animations['none'].hidden
        )
        if (inView) {
            control.start(
                animations[animationType]
                    ? animations[animationType].visible
                    : animations['none'].visible
            )
        }
    }, [inView, control, animations, animationType])

    function component() {
        switch (props.type) {
            case 'h1':
                return (
                    <motion.h1
                        ref={ref}
                        animate={control}
                        {...props}
                        style={{ ...props.style, color: textcolor }}>
                        {props.children}
                    </motion.h1>
                )
            case 'h2':
                return (
                    <motion.h2
                        ref={ref}
                        animate={control}
                        {...props}
                        style={{ ...props.style, color: textcolor }}>
                        {props.children}
                    </motion.h2>
                )
            case 'h3':
                return (
                    <motion.h3
                        ref={ref}
                        animate={control}
                        {...props}
                        style={{ ...props.style, color: textcolor }}>
                        {props.children}
                    </motion.h3>
                )
            case 'h4':
                return (
                    <motion.h4
                        ref={ref}
                        animate={control}
                        {...props}
                        style={{ ...props.style, color: textcolor }}>
                        {props.children}
                    </motion.h4>
                )
            case 'h5':
                return (
                    <motion.h5
                        ref={ref}
                        animate={control}
                        {...props}
                        style={{ ...props.style, color: textcolor }}>
                        {props.children}
                    </motion.h5>
                )
            case 'h6':
                return (
                    <motion.h6
                        ref={ref}
                        animate={control}
                        {...props}
                        style={{ ...props.style, color: textcolor }}>
                        {props.children}
                    </motion.h6>
                )

            default:
                return (
                    <motion.p
                        ref={ref}
                        animate={control}
                        {...props}
                        style={{ ...props.style, color: textcolor }}
                        className={type + ' ' + props.className}>
                        {props.children}
                    </motion.p>
                )
        }
    }

    return component()
}
