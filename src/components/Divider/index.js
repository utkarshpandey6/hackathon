import React from 'react';
import './styles.css';
export default (props) => {
    return <div className={'divider ' + props.className} {...props}></div>;
};
