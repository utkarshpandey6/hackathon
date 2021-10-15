import React from 'react'
import SVG from '../BouncingSVG'
import Empty from '../../assets/illustrations/empty.svg'
import Typography from '@material-ui/core/Typography'
function EmptyComp(props) {
    return (
        <div
            style={{
                width: '100%',
                padding: '5vh 20px',
                textAlign: 'center',
                boxSizing: 'border-box',
                ...props.style,
            }}>
            <SVG
                src={Empty}
                style={{
                    width: '30%',

                    height: props.height ? `${props.height}vh` : '30vh',
                    minWidth: '200px',
                    minHeight: '400px',
                }}></SVG>
            <Typography variant="h6" color="textSecondary">
                {props.message}
            </Typography>
        </div>
    )
}

export default EmptyComp
