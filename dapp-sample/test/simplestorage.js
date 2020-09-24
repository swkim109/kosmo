const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {

    it("should store the value", async () => {

        const instance = await SimpleStorage.deployed();
        // const _addresses = ["0x6B0086d92d9B78C09D54e6E9F07611f740D70369", "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c"];
        // const _amounts = [100,200];
        const _addresses = [];
        const _amounts = [];
        await instance.setUsers(_addresses, _amounts, { from: accounts[0] });
        
        const user = await instance.userToMember("0x6B0086d92d9B78C09D54e6E9F07611f740D70369");
        assert.equal(user.balance.toString(), "0", "The value was not stored.");
        
    });


});
