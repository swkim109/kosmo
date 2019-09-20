import React, { Component } from 'react';

import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {InputGroup, FormControl} from 'react-bootstrap';
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Loader from 'react-loader-spinner';


import getWeb3 from './utils/getWeb3';
import SimpleStorage from './contracts/SimpleStorage';

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

    async componentDidMount() {
      //TODO

    }

    handleSend = async () => {
        //TODO


    }




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
                    <Col md={5}>
                        <InputGroup style={{paddingBottom:'10px'}}>
                            <InputGroup.Addon>Value</InputGroup.Addon>
                            <FormControl type="number" placeholder="Enter number" bsSize="lg" onChange={this.handleChange} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} style={{textAlign: "center"}}>
                        <div className="button">
                            <ButtonToolbar>
                                <ButtonGroup justified>
                                    <Button href="#" bsStyle="primary" bsSize="large" block onClick={this.handleSend}>
                                        Send via Metamask
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop:'10px'}}>
                    <Col md={5}>
                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title>
                                    <Glyphicon glyph="signal" /> Stored Data - Event
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <div style={{display:"inline-block"}}>
                                    <p>
                                        {this.state.storedData}
                                    </p>
                                </div>
                                <div style={{display:"inline-block", float:"right"}}>
                                    Loading Spinner
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

            </Grid>

        )

    }
}


export default Main;

