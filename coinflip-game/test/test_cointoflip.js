
const coinFlip = artifacts.require("CoinToFlip");


contract("CoinFlip-1", function([_, player1, player2]) {


    before( async () => {
        this.instance = await coinFlip.deployed();
    });


    // 컨트랙트 배포자가 아니면 kill() 메소드가 실행되어서는 안된다.
    it("self-destruct should be executed by ONLY owner",  async () => {
        //let instance = await coinToFlip.deployed();

        try {
            await this.instance.kill({from:player1}); //error가 정상
        } catch (e) {
            var err = e;
        }
        assert.isOk(err instanceof Error, "Anyone can kill the contract");

    });



    // 컨트랙트에 5 ETH를 전송하면 컨트랙트의 잔액은 5 ETH가 되어야 한다.
    it("should have initial fund", async () => {

        let tx = await this.instance.sendTransaction({from: _, value: web3.utils.toWei("5", "ether")});
        //console.log(tx);
        //console.log(await instance.checkHouseFund.call());
        let bal = await web3.eth.getBalance(instance.address);
        //console.log(bal);
        assert.equal(web3.utils.fromWei(bal, "ether").toString(), "5", "Contract does not have enough fund");

    });


    // 0.1 ETH를 베팅하면 컨트랙트의 잔액은 5.1 ETH가 되어야 한다.
    it("should have normal bet", async () => {
        //let instance = await coinToFlip.deployed();

        const val = 0.1;
        const mask = 1; //Tails 0000 0001

        await this.instance.placeBet(mask, {from:player2, value:web3.utils.toWei(val.toString(), "ether")});
        let bal = await web3.eth.getBalance(instance.address);
        assert.equal(web3.utils.fromWei(bal, "ether").toString(), "5.1", "placeBet is failed");
    });


    // 플레이어는 베팅을 연속해서 두 번 할 수 없다(베팅한 후에는 항상 결과를 확인해야 한다).
    // 앞 테스트 케이스에서 이미 베팅햤으므로 이 테스트 케이스는 실패해야 정상이다.
    it("should have only one bet at a time", async () => {

        const val = 0.1;
        const mask = 1; //Tails 0000 0001

        try {
            await this.instance.placeBet(mask, {from:player2, value:web3.utils.toWei(val.toString(), "ether")});
        } catch (error) {
            var err = error;
        }
        assert.isOk(err instanceof Error, "Player should not bet more than two");
    });


});