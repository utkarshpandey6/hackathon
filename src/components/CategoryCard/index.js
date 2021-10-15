import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardAction from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.css'
function CategoryCard(props) {
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
                textAlign: 'center',
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
                                    textAlign: 'center',
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

export default CategoryCard
