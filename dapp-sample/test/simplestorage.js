const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {

    it("should store the value", async () => {

        const instance = await SimpleStorage.deployed();
        await instance.set(89, { from: accounts[0] });
        const storedData = await instance.get.call();

        assert.equal(storedData, 89, "The value was not stored.");
    });


});
