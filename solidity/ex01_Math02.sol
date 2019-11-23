pragma solidity ^0.5.11;
import "./SafeMath.sol";
contract MySol {
    using SafeMath for uint256;
    uint256 public a; uint256 public b;
    function calcSub() public {
        uint256 x = 0; uint256 y = 1;
        a = x.sub(y);
    }
    function calcAdd() public {
        uint256 x = 2**256-1;
        uint256 y = 1;
        b = x.add(y);
    }
}
