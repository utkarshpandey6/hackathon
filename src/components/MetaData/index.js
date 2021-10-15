import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = (props) => {
    const { title, description } = props.data

    return (
        <Helmet
            defaultTitle={'Divide & Conquer'}
            title={title ? title : 'Divide & Conquer'}>
            <title>{title ? title : 'Divide & Conquer'}</title>
            <meta name="description" content={description}></meta>
        </Helmet>
    )
}

export default MetaData
