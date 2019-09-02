import React, { Component } from 'react';

import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {InputGroup, FormControl} from 'react-bootstrap';
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Loader from 'react-loader-spinner';


import './css/bootstrap.min.css';
import './css/style.css';


class Main extends Component {

    state = {
        web3: null,
        accounts: null,
        contract: null,
        networkId: null,

        val: 0,
        storedData: '',
        pending: false
    };


    handleChange = (e) => {

        let val = 0;
        if (e.target.value !== "") {
            val = parseInt(e.target.value);
        }
        this.setState({val});
    }


    render() {

        return (

            <Grid fluid={true}>
                <Row>
                   1
                </Row>
                <Row>
                    <Col md={5} style={{textAlign: "center"}}>
                       2
                    </Col>
                </Row>
                <Row style={{marginTop:'10px'}}>
                    <Col md={5}>
                       3
                    </Col>
                </Row>
            </Grid>

        )

    }
}


export default Main;

