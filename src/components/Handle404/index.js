import React from 'react'
import { Redirect } from 'react-router-dom'
import withAnimate from '../../hoc/animate'

let handle = (props) => {
    let to = props.to ? props.to : '/404'
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Redirect to={to}></Redirect>
        </div>
    )
}

export default withAnimate(handle)
