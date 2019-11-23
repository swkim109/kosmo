pragma solidity ^0.5.11;
import "./SafeMath.sol";
contract MySol {
    uint256 public a;
    function calc() public {

        uint256 x = 0;
        uint256 y = 1;

        //a = x - y; // 2**256 - 1
        a = SafeMath.sub(x, y);
    }
}
