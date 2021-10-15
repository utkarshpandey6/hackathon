import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import './styles.css'
import { useInView } from 'react-intersection-observer'
export default function Card(props) {
    let [ref, inView] = useInView({
        triggerOnce: true,
        threshold: props.threshold,
    })

    let control = useAnimation()
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
                    ease: 'easeInOut',
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
        if (inView && props.animation) {
            console.log(
                animations[props.animation ? props.animation : 'none'].hidden
            )
            if (!animations[props.animation ? props.animation : 'none']) return
            control.start(
                animations[props.animation ? props.animation : 'none'].hidden
            )
            control.start(
                animations[props.animation ? props.animation : 'none'].visible
            )
        }
    }, [inView, animations, control, props.animation])

    return (
        <motion.div
            ref={ref}
            className={props.className ? props.className + ' card' : 'card'}
            {...props}
            animate={control}>
            {props.children}
        </motion.div>
    )
}
