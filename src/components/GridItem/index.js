import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './styles.css'
export default function GridItem(props) {
    let control = useAnimation()

    let [ref, inView] = useInView({
        triggerOnce: true,
        threshold: props.threshold ? props.threshold : 0.45,
    })

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
        if (props.animation)
            if (!animations[props.animation ? props.animation : 'none']) return
        control.start(
            animations[props.animation ? props.animation : 'none'].hidden
        )
    }, [props.animation, animations, control])

    useEffect(() => {
        if (inView && props.animation) {
            if (!animations[props.animation ? props.animation : 'none']) return
            control.start(
                animations[props.animation ? props.animation : 'none'].hidden
            )
            control.start(
                animations[props.animation ? props.animation : 'none'].visible
            )
        }
    }, [inView, animations, control, props.animation])

    return props.type === 'square' ? (
        <motion.div
            layout
            {...props}
            ref={ref}
            layoutId={props.children.props.id}
            animate={control}
            className="grid-wrap">
            {props.children}
        </motion.div>
    ) : (
        <motion.div
            layout
            ref={ref}
            layoutId={props.children.props.id}
            animate={control}
            className="grid-normal-wrap">
            {props.children}
        </motion.div>
    )
}
