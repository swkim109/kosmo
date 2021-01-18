import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare as fasCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';

export default function ({filled}) {
    return (
        <div>
            <FontAwesomeIcon icon={filled ? fasCheckSquare : farCheckSquare} size="5x"  />
        </div>
    )
}
