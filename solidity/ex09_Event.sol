pragma solidity ^0.5.8;


contract MySol {

    event Transfer(address sender, uint indexed value);

    function () external payable {
        emit Transfer(msg.sender, msg.value);
    }

}
