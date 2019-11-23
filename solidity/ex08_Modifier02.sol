
pragma solidity ^0.5.11;

contract MySol {

    modifier minValue(uint min) {
        require (min <= msg.value, "the mininum value");
        _;
    }

    modifier maxValue(uint max) {
        require (msg.value <= max, "the maximum value");
        _;
    }

    function doSomething() public payable minValue(1 ether) maxValue(5 ether) returns (uint256){
        return msg.value;
    }

}
