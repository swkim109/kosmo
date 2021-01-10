import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';

export default function ({filled, handleClick}) {
    return (
        <div onClick={handleClick}>
            <FontAwesomeIcon icon={filled ? fasCircle : farCircle} size="5x"  />
        </div>
    )
}
