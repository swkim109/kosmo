pragma solidity ^0.5.11;

contract Callee {

    function set(uint256 _val) public pure returns (uint256) {
        return _val * 10;
    }
}
