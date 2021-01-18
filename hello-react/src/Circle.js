import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';

export default function (props) {
    return (
        <div onClick={props.handleClick}>
            <FontAwesomeIcon icon={props.filled ? fasCircle : farCircle} size="5x"  />
        </div>
    )
}
