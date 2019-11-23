pragma solidity >=0.4.22 <0.6.0;

contract SayHello {

    address public sender;

    function say(string memory _greeting) public returns(string memory) {
        sender = msg.sender;
        return _greeting;
    }

}
