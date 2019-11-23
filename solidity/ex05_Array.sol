pragma solidity ^0.5.11;

contract MySol {

    // array in storage
    uint[10] public arrFixed;
    uint[] public arrDynamic;

    constructor() public {

        for (uint i=0; i<10; i++) {
            arrDynamic.push(i*10);
            arrFixed[i] = i*10;
        }
    }

    function addElement(uint256 _v) public {
        arrDynamic.push(_v); // push is only available for storage
    }

    function removeElement() public {
        arrDynamic.length = arrDynamic.length - 1; // only available for storage
    }


    function deleteDynamicArray() public returns (uint) {
        delete arrDynamic; //length to zero
        return arrDynamic.length;
    }

    function deleteArray() public returns (uint) {
        delete arrFixed; // all elements set zero
        return arrFixed.length;
    }

    function deleteItem(uint _index) public returns (uint) {
        delete arrFixed[_index];
        return arrFixed.length;
    }


}
