import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { motion } from 'framer-motion'
import Button from '@material-ui/core/Button'
import MTypography from '@material-ui/core/Typography'
import Banner from '../../components/Banner'
import Typography from '../../components/Typography'
import Grid from '../../components/Grid'
import Divider from '../../components/Divider'
import Map from '../../components/GoogleMap'
import withAnimate from '../../hoc/animate'
import theme from '../../config/theme'
import ReactGA from 'react-ga'
import IconButton from '@material-ui/core/IconButton'
import CodeIcon from '@material-ui/icons/Code'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import CollegeImage from '../../assets/images/college.jpg'
import CCChapter from '../../assets/images/cc-chapter.jpg'
import team from '../../assets/illustrations/team.svg'
import Skeleton from '@material-ui/lab/Skeleton'
import ProfileCard from '../../components/ProfileCard'
import { backend } from '../../config/httpClient'
import { LANDING, HOST } from '../../config/urls'
import { HOME } from '../../config/meta'
import MetaData from '../../components/MetaData'
import codechronicles from '../../assets/images/codechronicles.png'
import arambh from '../../assets/images/arambh.png'
import './styles.css'
import { Instagram } from '@material-ui/icons'

let Home = (props) => {
    const [data, setData] = useState({
        images: [1, 2, 3, 4, 5, 6],
        members: [1, 2, 3],
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        ReactGA.pageview('/')
        backend
            .get(LANDING)
            .then((data) => {
                setData(data.data)
            })
            .catch((err) => {})
            .finally(() => {
                setLoading(false)
            })
    }, [])
    let ccText =
        'Divide and Conquer has its own Campus CodeChef Chapter (JGEC Codechef Chapter). Divide and Conquer organize workshops, seminars, classes and doubt solving sessions in which CodeChef and its Campus Chapter Team help to accomplish the tasks smoothly. Divide and Conquer also organizes a monthly closed Quest contest on CodeChef, CodeChef laddus and certificates are issued to winners and the runner ups from the CodeChef.'
    let aboutText =
        'Divide & Conquer is a group of enthusiastic coders from Jalpaiguri Government Engineering College. Here, we not only introduce coding to students who have never given it a thought, but also provide mentorship and assistance to all the students throughout their journey. Weekly classes are organized where we learn together and help each other grow. Various coding contests are also organized to inculcate sense of competition, as well as instill confidence in the students. All of us here at Divide & Conquer mainly aim at providing a healthy and supportive environment for the students so that they can master their problem solving skills, replace their fears with motivation and inspiration, and have the confidence to overcome the challenges of tomorrow and reach great heights.'

    let events = [
        {
            id: '1',
            img: arambh,
            name: 'Aarambh',
            background: '#82589F',
            description:
                "The annual coding contest of Jalpaiguri Government Engineering College, organized by the members of Divide and Conquer, essentially for the freshers. It's a short contest of 2:30hrs based on ACM-ICPC style, hosted on Code Chef every year since 2018. It is a global contest and witnesses participation from all over the world every year.",
        },
        {
            id: '2',
            img: codechronicles,
            name: 'Code Chronicles',
            background: '#ffbe76',
            description:
                'The onsite coding contest organized during the Annual Techno Management fest "Sristi" of Jalpaiguri Government Engineering College in the month February. More than 100 students participate every year, and win exciting cash prizes.',
        },
    ]

    let routeTo = (route) => {
        props.history.push(route)
    }

    return (
        <div className="App">
            <MetaData data={HOME}></MetaData>
            {/* ---------------------------------------------------------------- Banner Section  -----------------------------------------------*/}

            <Banner {...props} />

            {/* ---------------------------------------------------------------- About Section  -----------------------------------------------*/}
            <section>
                <Typography
                    className="underline"
                    type="h2"
                    animation="fade"
                    duration={1}>
                    About Us
                </Typography>
                <div className="about-container">
                    <div className="about-graphics-container">
                        <img
                            loading="lazy"
                            alt="team illustraion"
                            src={team}
                            className="about-graphics"></img>
                    </div>
                    <div className="about-text-container">
                        <Typography
                            animation="fade"
                            duration={1.3}
                            alt="about us"
                            threshold={0.5}
                            className="about-text"
                            type="body1">
                            {aboutText}
                        </Typography>
                    </div>
                </div>
            </section>

            {/* --------------------------------------------------------------------Image Section -------------------------------------------------------*/}
            <section>
                <Typography
                    className="underline"
                    type="h2"
                    animation="fade"
                    duration={1}>
                    Images
                </Typography>
                <div className="images-container">
                    <Grid
                        type="square"
                        animation="scale"
                        duration={1}
                        columns={props.screenWidth < 700 ? 2 : 3}>
                        {data.images.map((val, ind) => (
                            <div
                                key={val.id}
                                className="image-wrapper"
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    if (loading) return
                                    routeTo(`/gallery/${val.album}`)
                                }}>
                                {loading ? (
                                    <Skeleton
                                        key={ind}
                                        height="100%"
                                        width="100%"
                                        animation="wave"
                                        variant="rect"></Skeleton>
                                ) : (
                                    <img
                                        loading="lazy"
                                        alt={val.image}
                                        src={`${HOST}${val.image}`}></img>
                                )}
                            </div>
                        ))}
                    </Grid>
                </div>
                <Button
                    onClick={() => {
                        routeTo('/gallery')
                    }}
                    variant={'contained'}
                    color="secondary"
                    style={{ margin: '18px 0px 15px 0px' }}>
                    <MTypography
                        variant="button"
                        style={{
                            margin: '2px 6px',

                            color: 'white',
                        }}>
                        View More
                    </MTypography>
                </Button>
            </section>

            {/* -----------------------------------------------------------------Committee Section-------------------------------------------------- */}

            <section
                style={{
                    backgroundColor: theme.color.primary,
                    marginTop: '80px',
                    paddingBottom: '50px',
                    color: 'white',
                }}>
                <Typography
                    className="underline-white"
                    type="h2"
                    animation="fade"
                    duration={1}>
                    <span style={{ color: 'white' }}>Committee</span>
                </Typography>
                <div className="committee-container">
                    <Grid
                        className="update-grid"
                        animation="slide_in"
                        duration={1}
                        threshold={0.3}
                        columns={
                            props.screenWidth <= 995
                                ? props.screenWidth <= 770
                                    ? 1
                                    : 2
                                : 3
                        }>
                        {data.members.map((val, ind) => {
                            return (
                                <ProfileCard
                                    id={val.name}
                                    key={val.name}
                                    loading={loading}
                                    whiteBackground
                                    image={`${HOST}${val.image}`}>
                                    <MTypography
                                        variant="h6"
                                        style={{
                                            fontWeight: '600',
                                            color: '#2d3436',
                                            margin: '5px 0px',
                                        }}>
                                        {loading ? (
                                            <Skeleton width="150px"></Skeleton>
                                        ) : (
                                            val.name
                                        )}
                                    </MTypography>
                                    <MTypography
                                        variant="body1"
                                        color="textSecondary"
                                        style={{
                                            margin: '5px 0px',
                                        }}></MTypography>
                                    <MTypography
                                        variant="body1"
                                        color="textSecondary"
                                        style={{
                                            margin: '5px 0px',
                                            fontWeight: '600',
                                        }}>
                                        {loading ? (
                                            <Skeleton width="175px"></Skeleton>
                                        ) : (
                                            `${val.designation} of DnC`
                                        )}
                                    </MTypography>
                                    <div
                                        style={{
                                            margin: '1px 0px',
                                            height: '35.2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                        <MTypography
                                            variant="caption"
                                            color="textSecondary">
                                            {loading ? (
                                                <Skeleton width="180px"></Skeleton>
                                            ) : (
                                                `${val.description}`
                                            )}
                                        </MTypography>
                                    </div>
                                    {loading ? (
                                        <div
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                padding: '10px 8px',
                                            }}>
                                            <Skeleton
                                                variant="circle"
                                                width={40}
                                                style={{ margin: '0px 10px' }}
                                                height={40}
                                                animation="wave"
                                            />
                                            <Skeleton
                                                variant="circle"
                                                width={40}
                                                style={{ margin: '0px 10px' }}
                                                height={40}
                                                animation="wave"
                                            />
                                            <Skeleton
                                                variant="circle"
                                                width={40}
                                                style={{ margin: '0px 10px' }}
                                                height={40}
                                                animation="wave"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                padding: '10px 8px',
                                            }}>
                                            {val.linkdin && (
                                                <IconButton
                                                    target="__blank"
                                                    href={val.linkdin}
                                                    color="secondary">
                                                    <LinkedInIcon
                                                        style={{
                                                            color: '#0e76a8',
                                                        }}
                                                    />
                                                </IconButton>
                                            )}
                                            {val.facebook && (
                                                <IconButton
                                                    color="secondary"
                                                    target="__blank"
                                                    href={val.facebook}>
                                                    <FacebookIcon
                                                        style={{
                                                            color: '#4267B2',
                                                        }}
                                                    />
                                                </IconButton>
                                            )}
                                            {val.code && (
                                                <IconButton
                                                    color="secondary"
                                                    target="__blank"
                                                    href={val.code}>
                                                    <CodeIcon
                                                        style={{
                                                            color: '#c23616',
                                                        }}
                                                    />
                                                </IconButton>
                                            )}
                                        </div>
                                    )}
                                </ProfileCard>
                            )
                        })}
                    </Grid>
                </div>

                <Button
                    onClick={() => {
                        routeTo('/committee')
                    }}
                    variant={'contained'}
                    color="secondary"
                    style={{ margin: '18px 0px 15px 0px' }}>
                    <MTypography
                        variant="button"
                        style={{
                            margin: '2px 6px',

                            color: 'white',
                        }}>
                        View More
                    </MTypography>
                </Button>
            </section>

            {/* ------------------------------------------------------------------CC Chapter Section ------------------------------------------ */}
            <section>
                <Typography
                    className="underline"
                    type="h2"
                    animation="fade"
                    duration={1}>
                    CodeChef Chapter
                </Typography>
                <div className="cc-container">
                    <div className="cc-text-container">
                        <Typography
                            animation="fade"
                            duration={1.3}
                            alt="about us"
                            threshold={0.5}
                            className="about-text"
                            type="body1">
                            {ccText}
                        </Typography>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    window.open(
                                        'https://www.facebook.com/CodeChef-JGEC-Chapter-102716661661470/',
                                        '__blank'
                                    )
                                }}>
                                <FacebookIcon
                                    style={{
                                        color: '#4267B2',
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    window.open(
                                        'https://www.instagram.com/codechef_jgec_chapter/',
                                        '__blank'
                                    )
                                }}>
                                <Instagram style={{ color: '#c32aa3' }} />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    window.open(
                                        'https://www.linkedin.com/company/codechef-jgec-chapter/',
                                        '__blank'
                                    )
                                }}>
                                <LinkedInIcon
                                    style={{
                                        color: '#0e76a8',
                                    }}
                                />
                            </IconButton>
                        </div>
                    </div>
                    <div className="cc-graphics-container">
                        <img
                            loading="lazy"
                            alt="team illustraion"
                            src={CCChapter}
                            className="cc-graphics"></img>
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------------- Events Section  -----------------------------------------------*/}
            <section>
                <Typography
                    className="underline"
                    type="h2"
                    animation="fade"
                    duration={1}>
                    Events
                </Typography>

                <div className="events-container">
                    {events.map((val) => (
                        <div key={val.name} className="events-item">
                            <div className="events-image-container">
                                <img
                                    style={{ backgroundColor: val.background }}
                                    loading="lazy"
                                    alt={val.name + ' Image'}
                                    className="events-image"
                                    src={val.img}></img>
                            </div>
                            <div className="events-text-container">
                                <div className="events-text-name">
                                    <Typography
                                        animation="fade"
                                        duration={1.3}
                                        threshold={0.5}
                                        className="events-name-text"
                                        style={{ margin: '2px' }}
                                        type="h4">
                                        {val.name}
                                    </Typography>
                                </div>
                                <Divider className="divider-underline"></Divider>
                                <div className="events-text-description">
                                    <Typography
                                        type="body1"
                                        animation="fade"
                                        duration={1.3}
                                        threshold={0.5}
                                        className="events-description-text"
                                        style={{ margin: '0px' }}
                                        color={theme.color.textSecondary}>
                                        {val.description}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Button
                    onClick={() => {
                        routeTo('/events')
                    }}
                    variant={'contained'}
                    color="secondary"
                    style={{ margin: '18px 0px 15px 0px' }}>
                    <MTypography
                        variant="button"
                        style={{
                            margin: '2px 6px',

                            color: 'white',
                        }}>
                        View More
                    </MTypography>
                </Button>
            </section>

            {/* ---------------------------------------------------------------- Contacts Section  -----------------------------------------------*/}
            <section className="contacts-section">
                <Typography
                    className="underline"
                    type="h2"
                    animation="fade"
                    duration={1}>
                    Reach Us
                </Typography>
                <div className="contact-container">
                    <div
                        className="contact-text-container"
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("${CollegeImage}")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <motion.div
                            animate={{ y: 10 }}
                            transition={{
                                repeat: 'Infinity',
                                repeatType: 'reverse',

                                duration: 0.8,
                            }}>
                            <ion-icon
                                name="location"
                                alt="location-icon"
                                style={{
                                    color: theme.color.secondary,
                                    fontSize: '45px',
                                    margin: '20px',
                                }}></ion-icon>
                        </motion.div>
                        <Typography
                            color="white"
                            style={{ fontWeight: '600', margin: '0px' }}>
                            Jalpaiguri Government Engineering College
                        </Typography>
                        <Typography
                            color="white"
                            style={{ fontWeight: '600', margin: '0px' }}>
                            Jalpaiguri, West Bengal, India - 735102.
                        </Typography>
                    </div>
                    <div className="contact-map-container">
                        <Map />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default withRouter(withAnimate(Home))
