import React, { Component } from 'react';

import {Grid, Row, Col, Panel} from 'react-bootstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {InputGroup, FormControl} from 'react-bootstrap';
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Loader from 'react-loader-spinner';
import EventList from "./EventList";


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
        pending: false,
        eventList: []
    };

    async componentDidMount() {

        //TODO-1
        try {

            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();

            const deployedNetwork = SimpleStorage.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorage.abi,
                deployedNetwork && deployedNetwork.address,
            );

            //TODO-3
            // instance.events.Change()
            //     .on('data', (event) => {
            //         this.handleEvent(event);
            //     })
            //     .on('error', (err) => { console.log(err) } );


            // TODO-4
            web3.eth.subscribe("logs", {address: instance.address})
                .on('data', (log) => { this.handleEventLog(log) })
                .on('error', (err) => console.log(err));

            this.setState({web3, accounts, networkId, contract: instance});

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert('Failed to load web3, accounts, or contract.');
            console.log(error);
        }
    }

    handleSend = async () => {

        //TODO-2
        const {accounts, contract} = this.state;
        if (this.state.val> 0) {
            this.setState({pending: !this.state.pending});

            try {
                // send tx
                await contract.methods.set(this.state.val).send({from:accounts[0]});
                // contract.methods.set(this.state.val).send({from:accounts[0]})
                //     .then(result=>console.log(result))
                //     .catch(error=>console.log(error));

                //read operation
                //await contract.methods.get().call();

            } catch (err) {
                // Ganache 와 Geth 에 따라 예외처리가 차이가 있음
                //console.log(err);
                this.setState({pending: false});
            }
        }
    }

    //TODO-3
    handleEvent = (event) => {
        this.setState({ pending: !this.state.pending,
                        storedData: event.returnValues.newVal });
    }

    // TODO-4
    handleEventLog = (log) => {

        const {web3} = this.state;
        const params = [{type: 'string', name: 'message'}, {type: 'uint256', name: 'newVal'}];
        const returnValues = web3.eth.abi.decodeLog(params, log.data);

        // TODO-5
        this.getPastEvents(log.blockNumber);

        this.setState({ pending: !this.state.pending,
                        storedData: returnValues.newVal });
    }

    // TODO-5
    getPastEvents = (blockNumber) => {
        const {contract} = this.state;
        let arr = [];
        const n = parseFloat(blockNumber);
        const fromBlock = n - 4;
        if (fromBlock >= 0) {
            contract.getPastEvents("Change", {fromBlock}).then((events) => {
                arr = [...events];
                this.setState({eventList: arr});
            });
        }
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
                                    <Button href="#" bsStyle="primary" bsSize="large" block
                                            onClick={this.handleSend}>

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
{this.state.pending?<Loader type="Grid" color="#CE62D4" height="50" width="50"/>:null}
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

                {/* TODO-5 Event list */}
                <Row>
                    <Col md={5}>
                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title>
                                    <Glyphicon glyph="signal" /> Log History
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <EventList result={this.state.eventList} />
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

            </Grid>

        )

    }
}


export default Main;