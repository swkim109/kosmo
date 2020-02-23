pragma solidity 0.5.16;

contract Donation {

    mapping(address => uint) public balances;

    function donate(address _to) public payable {
        balances[_to] += msg.value;
    }

    function balanceOf(address _who) public view returns (uint balance) {
        return balances[_who];
    }

    function withdraw(uint _amount) public {

       if (balances[msg.sender] >= _amount) {

          (bool bOk, bytes memory returnData) =
          msg.sender.call.value(_amount)(abi.encodeWithSelector(""));

          if (!bOk) {
              revert();
          }

          balances[msg.sender] -= _amount;
       }
    }

    function() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
