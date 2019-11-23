pragma solidity ^0.5.8;

contract MySol {

    uint[] public arr = new uint[](5); //dynamic array

    function addMember(uint _member) public returns (uint) {
        return arr.push(_member);
    }

    function f() public pure returns (uint[5] memory) {

        uint[5] memory arrMem;
        for(uint i=0; i<arrMem.length; i++) {
            arrMem[i] = i+1;
        }
        return arrMem;
    }

    function g() public pure returns (uint[] memory) {

        uint[] memory arrMem;
        for(uint i=0; i<10; i++) {
            arrMem[i] = i+1;
        }
        return arrMem;
    }

    function fn() public pure returns (uint){

        uint[5] memory arrMem = [uint(10), 20, 30, 40, 50];

        uint s;

        for(uint i=0; i<arrMem.length; i++) {
            s += arrMem[i];
        }

        return s;
    }

}
