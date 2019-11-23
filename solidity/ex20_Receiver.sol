pragma solidity ^0.5.11;

contract Receiver {

    uint256 public v1;
    //event checkGasLeft(uint256 _gas);

    function () external payable {
        //emit checkGasLeft(gasleft());
        v1 = v1 + msg.value;
    }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}