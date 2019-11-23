pragma solidity ^0.5.11;
import "./Receiver.sol";
contract Sender {
    Receiver receiver;
    constructor(address payable _addr) public {
        receiver = Receiver(_addr);
    }
    function send() public {
        address(receiver).transfer(1 ether);
    }
    function () external payable { }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}


