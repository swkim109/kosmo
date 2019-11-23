pragma solidity ^0.5.11;

contract MySol {

    bytes public arr;
    bytes public arr2;

    constructor() public {
        arr = "ABC";
    }

    function copyValue() public {
        arr2 = arr; //storage <- storage
    }

    function copyRefMemory() public view returns (bytes memory){
        bytes memory arrRef = arr;  // memory <- storage
        arrRef[0] = "D";
        return arrRef;
    }

    function changeRefStorage() public returns (bytes memory result) {
        bytes storage arrRef = arr; // storage(local) <- storage
        arrRef.push("D");
        result = arrRef; // memory <- storage
    }

}
