pragma solidity ^0.5.11;

contract MySol {

    uint256 public startTime;
    uint256 public endTime;
    uint8 public totalNumofTokens = 255;
    ////
    address owner;
    constructor() public {
        owner = msg.sender;
    }
    modifier onlyOwner {
         require (msg.sender == owner, "Only owner can call this function.");
         _;
    }
    ////

    function start() external onlyOwner {
        require(!isOpen);
        startTime = now; // current block timestamp;
        endTime = startTime + 5 * 1 minutes; //seconds, hours, days
    }

    function getRemaingTime() external returns (uint256 remainingTime){
        if (now <= endTime) {
            remainingTime = (endTime - now) / 1 seconds;
        } else {
            remainingTime = 0;
        }
    }
    function saleToken() external {
        if (totalNumofTokens > 0 && (now < endTime)) {
            totalNumofTokens--;
        }
    }
}
