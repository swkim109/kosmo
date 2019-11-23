pragma solidity ^0.5.11;

import "./ex20_Receiver.sol";

contract MySol {

    Receiver receiver;

    constructor(address payable _addr) public {
        receiver = Receiver(_addr);
    }

    function send() public returns (bool){

        bool bOk = address(receiver).send(0.1 ether);

        if (!bOk) {
            revert();
        }

        return bOk;
    }


    function () external payable {
    }


    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}


