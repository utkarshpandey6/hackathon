import React from 'react'
import { motion } from 'framer-motion'
export function withAnimateAuth(Component) {
    return class Animate extends React.Component {
        variant = {
            hidden: {
                x: 100,

                z: -100,
            },
            visible: {
                x: 0,

                transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                },
            },
            exit: {
                x: -500,
                transition: { duration: 0.3 },
            },
        }

        render() {
            return (
                <motion.div
                    style={{ display: 'flex', flex: '1', width: '100%' }}
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

export function withAnimateAuthGraphics(Component) {
    return class Animate extends React.Component {
        variant = {
            hidden: {
                y: 100,
                opacity: 0,
                z: -100,
            },
            visible: {
                y: 0,
                opacity: 1,

                transition: {
                    duration: 0.3,
                },
            },
            exit: {
                y: -100,

                opacity: 0,
                transition: { duration: 0.4 },
            },
        }

        render() {
            return (
                <motion.div
                    style={{ width: '100%' }}
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
