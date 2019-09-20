import React, { Component } from 'react';

import {Grid, Row, Col, Panel, Image, Alert} from 'react-bootstrap';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';
import {InputGroup, FormControl, Radio} from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {CoinHeads, CoinHeadsI, CoinTails, CoinTailsI, CoinUnknown} from './images';
import ModalWrapper from './ModalWrapper';

import './css/bootstrap.min.css';
import './css/style.css';

import getWeb3 from './utils/getWeb3';
import CoinToFlip from './contracts/CoinToFlip.json';


class CoinFlip extends Component {

    state = {
        web3: null,
        accounts: null,
        contract: null,

        houseBalance: 0,
        show: false,
        value: 0, //wager
        checked: 0, //coin
        reveal: 0,
        reward: 0,
        pending: false
    };

    constructor(props) {
        super(props);
    }

    handleClickCoin = (e) => {

        //TODO-1

    };

    handleClickFlip = async () => {

        const {accounts, contract} = this.state;

        if (!this.state.web3) {
            console.log('App is not ready');
            return;
        }

        if (accounts[0] === undefined) {
            alert('Please press F5 to connect Dapp'); //need main page maybe?
            return;
        }

        this.setState({pending: true});

        //TODO-2

    };

    handleClickBet = async () => {

        const {web3, accounts, contract} = this.state;  //object destructuring in ES6

        if (!this.state.web3) {
            console.log('App is not ready');
            return;
        }

        if (accounts[0] === undefined) {
            alert('Please press F5 to connect Dapp'); //Metamask account need to refresh page
            return;
        }

        // if (localStorage.getItem("txHash") !== "") {
        //     alert('Already bet');
        //     return;
        // }

        //TODO-3

    }


    handleClickReset = () => {
        this.setState({value: 0, checked: 0, reveal: 0, reward: 0});

        localStorage.setItem('txHash', "");
        this.getHouseBalance();
        this.inputEth.value = '';
    }

    handleValChange = (e) => {
        this.setState({value: parseFloat(e.target.value)});
    }

    handleRefund = async () => {

        const {accounts, contract} = this.state;

        if (!this.state.web3) {
            console.log('App is not ready');
            return;
        }

        if (accounts[0] === undefined) {
            alert('Please press F5 to connect Dapp');
            return;
        }

        //TODO

    }



    getHouseBalance = () => {
        const {web3, contract} = this.state;

        web3.eth.getBalance(contract._address, (e, r) => {
            this.setState({houseBalance: web3.utils.fromWei(r, 'ether')});
        });
    };


    watchEvent = (event) => {
        //TODO
        //const {web3} = this.state;
        //this.setState({reveal: web3.utils.toDecimal(event.returnValues.reveal)}, ()=>{localStorage.setItem('txHash', ""); this.getHouseBalance()});

    };


    watchPaymentEvent = (event) => {
        const {web3} = this.state;
        const r = web3.utils.fromWei(event.returnValues.amount.toString(), 'ether');

        if (r > 0) {
            this.setState({reward: r});
        }
    }


    async componentDidMount() {

        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            let accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = CoinToFlip.networks[networkId];
            const instance = new web3.eth.Contract(
                CoinToFlip.abi,
                deployedNetwork && deployedNetwork.address,
            );


            //TODO-4
            //Reveal(), Payment()




            // window.ethereum.on('accountsChanged', function (accounts) {
            //     console.log(accounts[0]);
            //     window.location.reload();
            // });

            this.setState({web3, accounts, contract: instance}, this.getHouseBalance);

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert('Failed to load web3, accounts, or contract. Check console for details.');
            console.log(error);
        }
    }


    render() {

        let coin_h = CoinHeadsI;
        let coin_t = CoinTailsI;

        if (this.state.checked === 2) {
            coin_h = CoinHeads;
        } else if (this.state.checked === 1) {
            coin_t = CoinTails;
        }

        return (

            <Grid fluid={true}>
                <Row>
                    <Col md={5}>

                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title>
                                    <Glyphicon glyph="thumbs-up" /> House: {this.state.houseBalance} ETH
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="custom-align-center">
                                <div>
                                    <Image src={coin_h} id="Heads" onClick={this.handleClickCoin} className="img-coin" />
                                    <Image src={coin_t} id="Tails" onClick={this.handleClickCoin} className="img-coin" />
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col md={5}>
                        <Reveal reveal={this.state.reveal} reward={this.state.reward} />
                    </Col>
                </Row>

                <Row>
                    <Col md={5}>
                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title>
                                    <Glyphicon glyph="ok-circle" /> Your Bet
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="custom-align-center">

                                <form>
                                    <InputGroup style={{paddingBottom:'10px'}}>
                                        <Radio name="coinRadioGroup" id="Heads" onChange={this.handleClickCoin} checked={this.state.checked === 2} inline>
                                            Heads
                                        </Radio>{' '}
                                        <Radio name="coinRadioGroup" id="Tails" onChange={this.handleClickCoin} checked={this.state.checked === 1} inline>
                                            Tails
                                        </Radio>
                                    </InputGroup>
                                    <InputGroup style={{paddingBottom:'10px'}}>
                                        <InputGroup.Addon>ETH</InputGroup.Addon>
                                        <FormControl type="number" placeholder="Enter number" bsSize="lg"
                                                     onChange={this.handleValChange} inputRef={(ref)=>this.inputEth=ref}/>
                                    </InputGroup>
                                    <AlertMsg flag={this.state.show}/>
                                </form>

                                <ButtonToolbar>
                                    <ButtonGroup justified>
                                        <Button href="#" bsStyle="primary" bsSize="large">
                                            Bet
                                        </Button>
                                        <Button href="#" bsStyle="success" bsSize="large">
                                            Flip!
                                        </Button>
                                        <Button href="#" bsSize="large">
                                            Cancel
                                        </Button>
                                        <Button href="#" bsStyle="info" bsSize="large">
                                            Reset
                                        </Button>
                                    </ButtonGroup>
                                </ButtonToolbar>

                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col md={5}>
                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title>
                                    <Glyphicon glyph="signal" /> Transactions
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                {localStorage.getItem("txHash")}
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
                {this.state.pending?<PendingModal>Ready to Send Your Transaction...</PendingModal>:null}
            </Grid>

        )
    }
}

//functional component
function AlertMsg(props) {

    if (props.flag) {
        return (
            <Alert bsStyle="danger">
                <strong>You should flip the coin and bet bigger than 0.01 ETH</strong>
            </Alert>
        )
    }
    return <br/>
}

//functional component
function Reveal(props) {

    let coinImg = CoinUnknown;
    if (props.reveal === 2) {
        coinImg =  CoinHeads;
    } else if (props.reveal === 1) {
        coinImg = CoinTails;
    }

    let coin = <Image src={coinImg} className="img-coin" />

    return (
        <Panel bsStyle="info">
            <Panel.Heading>
                <Panel.Title>
                    <Glyphicon glyph="adjust"/> Coin Reveal
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body className="custom-align-center">
                {coin}
                {props.reward} ETH
            </Panel.Body>
        </Panel>
    );
}


const PendingModal = ({children}) => (
    <ModalWrapper>
        <div style={{marginBottom: '10px'}}>{children}</div>
    </ModalWrapper>
)


export default CoinFlip;
