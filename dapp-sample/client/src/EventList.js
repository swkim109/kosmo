import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
function EventList({result}) {
    let eventList = result.map(e => (
        <ListGroupItem key={e.transactionHash} bsStyle="success">
            <b>[{e.transactionHash}] {e.returnValues.newVal}</b>
        </ListGroupItem>)
    );

    return (
        <ListGroup>
            {eventList}
        </ListGroup>
    );
}
export default EventList;