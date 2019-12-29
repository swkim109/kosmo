pragma solidity ^0.5.11;

contract MySol {

    bytes public arr;

    constructor() public {
        arr = "ABC";
    }

    function getElementByIndex(uint8 _index) public view returns (byte) {
        return arr[_index];
    }

    function getLength() public view returns (uint) {
        return arr.length;
    }
    function changeElement() public {
        arr[0] = "Z";
    }

    function addElement(byte _v) public { //0x44
        arr.push(_v);
    }

    function cutElement() public {
        if (arr.length > 0) {
            arr.length = arr.length - 1; //cut the last element
            //arr.pop();
        }
    }
}
