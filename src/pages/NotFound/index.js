import React from 'react'
import withAnimate from '../../hoc/animate'
import Typography from '../../components/Typography'
import { withRouter } from 'react-router-dom'
import theme from '../../config/theme'
import PageNotFound from '../../assets/illustrations/page_not_found.svg'
import { NOTFOUND } from '../../config/meta'
import MetaData from '../../components/MetaData'
import Button from '@material-ui/core/Button'
import './styles.css'
let NotFound = (props) => {
    return (
        <div className="not-found-container">
            <MetaData data={NOTFOUND}></MetaData>
            <img
                loading="lazy"
                alt="not-found"
                className="not-found-illustration"
                src={PageNotFound}></img>
            <Typography
                type="h5"
                color={theme.color.textSecondary}
                className="not-found-text">
                Uh-Oh! Page Not Found!
            </Typography>
            <div style={{ display: 'flex' }}>
                <Button
                    onClick={() => {
                        props.history.push('/')
                    }}
                    style={{ margin: '0px 10px', color: 'white' }}
                    color="primary"
                    variant="contained">
                    Home
                </Button>
                <Button
                    onClick={() => {
                        props.history.goBack()
                    }}
                    style={{ margin: '0px 10px' }}
                    color="secondary"
                    variant="contained">
                    Back
                </Button>
            </div>
        </div>
    )
}
export default withRouter(withAnimate(NotFound))
