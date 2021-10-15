import React from 'react'
import ReactLoading from 'react-loading'
import theme from '../../config/theme'
import Typography from '@material-ui/core/Typography'
function Loading(props) {
    const animationType = 'bars'

    return (
        <div
            style={{
                textAlign: 'center',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <div style={{ position: 'absolute', top: 0 }}>
                <ReactLoading
                    type={animationType}
                    color={'white'}></ReactLoading>
            </div>
            <ReactLoading
                type={animationType}
                color={theme.color.secondary}></ReactLoading>
            {props.message ? (
                <Typography
                    color="textSecondary"
                    style={{ margin: '20px auto' }}
                    variant="h6">
                    {props.message}
                </Typography>
            ) : null}
        </div>
    )
}

export default Loading
