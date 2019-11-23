pragma solidity >=0.4.22 <0.6.0;

import "./SayHello.sol";

contract HelloWorld {

    string greeting;

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function say() public returns(string memory _result) {
        address addr = 0xbBF289D846208c16EDc8474705C748aff07732dB;
        (bool bOk, bytes memory result) = addr.call(abi.encodeWithSignature("say(string)", greeting));
        //(bool bOk,) = addr.call(abi.encodeWithSignature("say(string)", greeting));
        if (bOk) {
            _result = abi.decode(result, (string));
        }
    }

}
