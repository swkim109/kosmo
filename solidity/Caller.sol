pragma solidity ^0.5.11;

import "./Callee.sol";

contract Caller {

    Callee public callee;
    address calleeAddr;

    constructor (address _addr) public {
        callee = Callee(_addr);
        calleeAddr = _addr;
    }

    function registerByABI(uint256 _val) external view returns (uint256) {

        uint256 returnData = callee.set(_val);
        return returnData;
    }

    function registerByCall(uint256 _val) external returns (uint256) {

        bytes memory payload = abi.encodeWithSignature("set(uint256)", _val);
        //bytes memory payload = abi.encodeWithSelector(bytes4(keccak256(bytes("set(uint256)"))), _val);

        (bool bOk, bytes memory returnData) = calleeAddr.call(payload);
        if (!bOk) {
            revert();
        }

        return toUint256(returnData);
    }

    function toUint256(bytes memory b) internal pure returns (uint256){
        uint256 number;
        for(uint i=0;i<b.length;i++){
            number = number + uint8(b[i])*(2**(8*(b.length-(i+1))));
        }
        return number;
    }


}