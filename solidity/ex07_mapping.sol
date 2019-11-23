pragma solidity ^0.5.11;

contract MySol {
    mapping(address => uint256) balances;
    constructor () public {
        balances[0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c] = 10000000000;
    }
    function balanceOf(address _tokenOwner) public view
             returns (uint256) {
        return balances[_tokenOwner];
    }
    function transfer(address _to, uint256 _tokens) public returns (bool) {
        require(_tokens <= balances[msg.sender], "Not enough tokens");
        balances[msg.sender] = balances[msg.sender] - _tokens;
        balances[_to] = balances[_to] + _tokens;
        return true;
    }
}


