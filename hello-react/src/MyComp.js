import React from 'react';

class MyComp extends React.Component {

    constructor(props) {
        super(props);
        this.str = "Hello, World!";
    }

    render () {
        return <h1>{this.str}</h1>
    }
}
export default MyComp;
