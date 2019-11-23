pragma solidity ^0.5.11;
contract MySol {
    struct UserInfo {
        string userId;
        string userName;
        uint userAge;
    }

    UserInfo public userInfo;
    UserInfo[] public UserList;

    function addUser(string calldata _userId,
                     string calldata _userName,
                       uint _userAge) external returns (bool) {

        bool result;
        UserInfo memory user;
        user.userId = _userId;
        user.userName = _userName;
        user.userAge = _userAge;

        uint i = UserList.push(user);

        //uint i = UserList.push(UserInfo({userId: _userId, userName: _userName, userAge: _userAge}));

        if (i > 0) {
            result = true;
        }
        return result;
    }
}


