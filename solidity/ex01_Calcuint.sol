pragma solidity ^0.5.11;

contract Test {

    function calc() public pure {

        uint8 x = 2**8-1;
        assert(-x == 1);
    }
}
