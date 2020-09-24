pragma solidity ^0.5.8;

contract SimpleStorage {

    uint storedData;

    struct Member {
        uint balance;
        uint age;
    }

    mapping (address => Member) public userToMember;

    event Change(string message, uint newVal);

    constructor (uint s) public {
        storedData = s;
    }

    function set(uint x) public {

        require(x < 1000, "Should be less than 1000");
        storedData = x;
        emit Change("set", x);
    }

    function get() public view returns (uint) {
        return storedData;
    }

    function setUsers(address[] memory _addresses, uint[] memory _amounts) public {
        for (uint i=0; i<_addresses.length; i++) {
            userToMember[_addresses[i]].balance = _amounts[i];
        }
    }

}
