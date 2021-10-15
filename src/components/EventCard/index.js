import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardAction from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'

function getEventTime(s) {
    return new Date(s).toLocaleTimeString()
}

function getEventDate(s) {
    return new Date(s).toDateString()
}

function getDuration(s, e) {
    let milliseconds = new Date(e) - new Date(s)
    let minutes = (milliseconds / (1000 * 60)) % 60
    let hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24
    let final = `${hours} hours`
    if (minutes > 0) {
        final += ` ${minutes} minutes`
    }

    return final
}

function EventCard(props) {
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
            minWidth: '80%',
        },
    })

    const nTimes = (n) => {
        let m = []
        for (let i = 0; i < n; i++) m.push(i)

        return m.map((val, ind) => {
            return (
                <Typography key={val} variant="body2">
                    <Skeleton animation="wave" />
                </Typography>
            )
        })
    }

    const classes = useStyles()
    return (
        <Card
            key={'Dxv'}
            onClick={props.onClick}
            className={classes.root}
            style={{
                boxShadow: '7px 7px 14px -3px rgba(0, 0, 0, 0.75)',
                margin: '25px',
            }}>
            <CardActionArea>
                {props.loading ? (
                    <Skeleton
                        variant="rect"
                        animation="wave"
                        height={160}></Skeleton>
                ) : (
                    <CardMedia
                        component="img"
                        loading="lazy"
                        alt={props.name || props.title}
                        style={{
                            objectFit: 'fill',
                            backgroundColor: '#DDD',
                        }}
                        height="160"
                        image={props.image}
                        title={props.name || props.title}
                    />
                )}
                <CardContent>
                    {props.name && (
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.loading ? (
                                <Skeleton animation="wave"></Skeleton>
                            ) : (
                                props.name
                            )}
                        </Typography>
                    )}
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        {props.start_time && (
                            <Typography color="textSecondary" variant="body1">
                                {props.loading ? (
                                    <Skeleton animation="wave"></Skeleton>
                                ) : (
                                    <span>
                                        <strong>Starting On: </strong>
                                        {`${getEventDate(
                                            props.start_time
                                        )}, ${getEventTime(props.start_time)} `}
                                    </span>
                                )}
                            </Typography>
                        )}
                        {props.end_time && (
                            <Typography color="textSecondary" variant="body1">
                                {props.loading ? (
                                    <Skeleton animation="wave"></Skeleton>
                                ) : (
                                    <span>
                                        <strong>Duration: </strong>
                                        {` ${getDuration(
                                            props.start_time,
                                            props.end_time
                                        )} `}
                                    </span>
                                )}
                            </Typography>
                        )}
                    </div>

                    {props.description ? (
                        !props.loading ? (
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                className={
                                    props.descriptionLength === undefined
                                        ? 'description-text3'
                                        : `description-text${props.descriptionLength}`
                                }
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                {`${props.description}`}
                            </Typography>
                        ) : (
                            <React.Fragment>
                                {nTimes(props.descriptionLength)}
                            </React.Fragment>
                        )
                    ) : null}
                </CardContent>
            </CardActionArea>
            {props.actions && <CardAction>{props.actions}</CardAction>}
        </Card>
    )
}

export default EventCard
