import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

import './styles.css'

function ProfileCard(props) {
    return (
        <div
            style={{
                boxSizing: 'border-box',
                paddingTop: '5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '5rem',
                width: '100%',
            }}>
            <div
                className={
                    props.whiteBackground
                        ? 'profile-card-container white-background'
                        : 'profile-card-container'
                }>
                <div className="avatar">
                    {props.loading ? (
                        <Skeleton
                            variant="circle"
                            width="100%"
                            animation="wave"
                            height={'100%'}></Skeleton>
                    ) : (
                        <img
                            style={{ width: '100%' }}
                            alt="profile_image"
                            src={props.image ? props.image : ''}
                        />
                    )}
                </div>
                <div className="profile-card-content">{props.children}</div>
            </div>
        </div>
    )
}

export default ProfileCard
