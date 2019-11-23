pragma solidity ^0.5.11;

contract Test {

    function calc() public pure returns (bool result){

        uint8 x = 2**8-1;
        uint8 b = x + 1;
        if (b > x) {
            result = true;
        }
        return result;
    }
}
