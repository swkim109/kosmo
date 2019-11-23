pragma solidity ^0.5.11;

contract MySol {

    //선언은 열x행이지만 참조는 행열로 한다.
    uint[3][2] arr = [[1,2,3], [4,5,6]]; //2x3 array

    function getElement(uint i, uint j) public view returns (uint) {
        return arr[i][j]; // i = 0,1 j = 0,1,2
    }

}