pragma solidity ^0.5.11;
contract MySol {
    bytes8 public v;
    constructor() public {
        v = "ABC";
    }
    function getElementByIndex(uint8 _index) public view returns (byte) {
        return v[_index];
    }
    function getLength() public view returns (uint) {
        return v.length;
    }
    // compile error
    // function changeElement() public {
    //     v[0] = "Z";
    // }
}


