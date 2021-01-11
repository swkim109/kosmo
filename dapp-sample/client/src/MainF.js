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
    
        const fnInit = async () => {
            return await getWeb3();
        }
        fnInit().then((v) => {
            setWeb3(v);
        });
        
    }, []);
    
    useEffect(() => {
        
        const getAccounts = async () => {
            return await web3.eth.getAccounts();
        }
        
        if (web3 !== null) {
            getAccounts().then(async (v) => {
                console.log(v);
                setAccounts(v);
    
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = SimpleStorage.networks[networkId];
                const instance = new web3.eth.Contract(
                    SimpleStorage.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                setContract(instance);
    
                web3.eth.subscribe("logs", {address: instance.address})
                    .on('data', (log) => { handleEventLog(log) })
                    .on('error', (err) => console.log(err));
                
            });
        }
    }, [web3]);
    
    const handleEventLog = (log) => {
        
        const params = [{type: 'string', name: 'message'}, {type: 'uint256', name: 'newVal'}];
        const returnValues = web3.eth.abi.decodeLog(params, log.data);
    
        setPending(false);
        setStoredData(returnValues.newVal);
    }
    
    
    const handleSend = async () => {
    
        if (val > 0) {
            setPending(true);
    
            try {
                await contract.methods.set(val).send({from:accounts[0]});
        
            } catch (err) {
                setPending(false);
            }
        }
    }
    
    const handleGet = async () => {
        const v = await contract.methods.get().call();
        setStoredData(v);
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
