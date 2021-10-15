import React from 'react'
import { motion } from 'framer-motion'

export default (props) => {
    let animation = { y: props.strength ? props.strength : 10 }
    return (
        <motion.img
            loading="lazy"
            animate={props.bounce ? animation : {}}
            transition={{
                repeat: 'Infinity',
                duration: props.duration ? props.duration : 0.8,
                delay: props.delay ? props.delay : 0,
                repeatType: 'reverse',
            }}
            {...props}></motion.img>
    )
}
