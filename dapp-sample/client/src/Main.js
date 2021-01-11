import React, {useEffect, useState} from 'react';

import {Button, ButtonGroup, ButtonToolbar, Col, FormControl, Grid, InputGroup, Panel, Row} from 'react-bootstrap';
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Loader from 'react-loader-spinner';

import getWeb3 from './utils/getWeb3';

import './css/bootstrap.min.css';
import './css/style.css';
import SimpleStorage from "./contracts/SimpleStorage.json";


function Main() {
    
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [contract, setContract] = useState(null);
    
    const [val, setVal] = useState(0);
    const [storedData, setStoredData] = useState('');
    const [pending, setPending] = useState(false);
    
    
    useEffect(() => {
        
        // TODO-1
        
        
    }, []);
    
    
    useEffect(() => {
    
        // TODO-2
        
    }, [web3]);
    
    
    
    const handleSend = async () => {
    
        // TODO-3
        
    }
    
    
    const handleGet = async () => {
        // TODO-4
        
    }
    
    const handleChange = (e) => {
        
        let val = 0;
        if (e.target.value !== "") {
            val = parseInt(e.target.value);
        }
        setVal(val);
    }
    
    return (
        
        <Grid fluid={true}>
            <Row>
                <Col md={5}>
                    <InputGroup style={{paddingBottom:'10px'}}>
                        <InputGroup.Addon>Value</InputGroup.Addon>
                        <FormControl type="number" placeholder="Enter number" bsSize="lg" onChange={handleChange} />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md={5} style={{textAlign: "center"}}>
                    <div className="button">
                        <ButtonToolbar>
                            <ButtonGroup justified>
                                <Button href="#" bsStyle="primary" bsSize="large" block
                                        onClick={handleSend}>
                                    Set
                                </Button>
                                <Button href="#" bsStyle="success" bsSize="large" block
                                        onClick={handleGet}>
                                    Get
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
                                    {storedData}
                                </p>
                            </div>
                            <div style={{display:"inline-block", float:"right"}}>
                                {pending?<Loader type="Grid" color="#CE62D4" height="50" width="50"/>:null}
                            </div>
                        </Panel.Body>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    
    );
}

export default Main;
