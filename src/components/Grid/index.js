import React from 'react'
import { motion } from 'framer-motion'
import GridItem from '../GridItem/index'
import './styles.css'
export default function Grid(props) {
    let columns = props.columns ? props.columns : 3
    let gridTemplet = '1fr '.repeat(columns)

    function squareGrid() {
        if (!props.children) return
        if (!Array.isArray(props.children))
            return (
                <GridItem {...props} delay={props.delay ? props.delay : 0.3}>
                    {props.children}
                </GridItem>
            )
        return React.Children.map(props.children, (child, i) => {
            return (
                <GridItem
                    {...props}
                    delay={
                        ((i % columns) + 1) * (props.delay ? props.delay : 0.3)
                    }>
                    {child}
                </GridItem>
            )
        })
    }

    function normalGrid() {
        if (!props.children) return
        if (!Array.isArray(props.children))
            return (
                <GridItem
                    type={props.type}
                    {...props}
                    delay={props.delay ? props.delay : 0.3}>
                    {props.children}
                </GridItem>
            )
        return React.Children.map(props.children, (child, i) => {
            return (
                <GridItem
                    type={props.type}
                    {...props}
                    delay={
                        ((i % columns) + 1) * (props.delay ? props.delay : 0.3)
                    }>
                    {child}
                </GridItem>
            )
        })
    }

    return (
        <motion.div
            transition={{ delayChildren: props.delay }}
            {...props}
            layout
            className={
                props.className
                    ? props.className +
                      (props.type === 'square'
                          ? ' grid-container-square'
                          : ' grid-container')
                    : props.type === 'square'
                    ? 'grid-container-square'
                    : 'grid-container'
            }
            style={{
                ...props.style,
                gridTemplateColumns: gridTemplet,
                padding:
                    props.type === 'square' ? '20px 15px 20px 15px' : '0px',
            }}>
            {props.type === 'square' ? squareGrid() : normalGrid()}
        </motion.div>
    )
}
