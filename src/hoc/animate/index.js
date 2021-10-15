import React from 'react'
import { motion } from 'framer-motion'
export default function withAnimate(Component) {
    return class Animate extends React.Component {
        variant = {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,

                transition: {
                    duration: 0.4,
                },
            },
            exit: {
                opacity: 0,
                transition: { duration: 0.5 },
            },
        }

        render() {
            return (
                <motion.div
                    className="App"
                    variants={this.variant}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                    <Component {...this.props} />
                </motion.div>
            )
        }
    }
}
