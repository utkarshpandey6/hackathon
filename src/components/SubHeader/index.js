import React from 'react'
import { motion } from 'framer-motion'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Skeleton from '@material-ui/lab/Skeleton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import './styles.css'
function SubHeader(props) {
    const variants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: { delay: 0.6, type: 'spring' },
        },
        hidden: {
            opacity: 0,
            x: 100,
            transition: { delay: 0.8, type: 'spring' },
        },
    }

    return (
        <React.Fragment>
            <div className="header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={props.onBack}
                        color="secondary"
                        style={{ margin: '0 10px' }}>
                        <ArrowBackIcon
                            color="secondary"
                            style={{ fontSize: '30' }}
                        />
                    </IconButton>
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        style={{ fontWeight: '500' }}>
                        {props.title || <Skeleton width={100}></Skeleton>}
                    </Typography>
                </div>
                {props.screenWidth >= 645 && props.onSearchChange !== null ? (
                    props.loading ? null : (
                        <motion.div
                            layout
                            variants={variants}
                            style={{ padding: '0 18px' }}>
                            <input
                                onChange={props.onSearchChange}
                                placeholder={
                                    props.placeholder
                                        ? props.placeholder
                                        : 'Search...'
                                }
                                className="search"
                                type="search"></input>
                        </motion.div>
                    )
                ) : null}
            </div>
            {props.noDivider ? null : (
                <Divider style={{ width: '100%' }}></Divider>
            )}
        </React.Fragment>
    )
}

export default SubHeader
