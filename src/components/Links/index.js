import React from 'react';
import './styles.css';
export default (props) => {
    return (
        <a {...props} className={'links ' + props.className}>
            {props.children}
        </a>
    );
};
