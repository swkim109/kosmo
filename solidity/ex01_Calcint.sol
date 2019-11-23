pragma solidity ^0.5.11;

contract Test {

    function calc() public pure {

        int8 x = -2**7;
        assert(-x == x);

    }
}
