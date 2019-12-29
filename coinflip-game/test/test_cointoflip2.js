const coinFlip = artifacts.require("CoinToFlip");

contract("CoinFlip-2", function([_, player1, house]) {


    before( async () => {
        this.instance = await coinFlip.deployed();
        await this.instance.sendTransaction({from: house, value: web3.utils.toWei("1", "ether")});
        this.BN = web3.utils.BN;

        // 컨트랙트 상금 로직과 일치
        this.getWinningAmount = (v) => {

            const HOUSE_MIN_FEE = new this.BN(web3.utils.toWei("0.005", "ether"));
            const HOUSE_FEE_PERCENT = new this.BN('5');
            const PERCENT = new this.BN('100');
            const MAX_CASE = new this.BN('2');

            const amount = new this.BN(v);
            let fee = amount.mul(HOUSE_FEE_PERCENT).div(PERCENT);

            if (fee.lt(HOUSE_MIN_FEE)) {
                fee = HOUSE_MIN_FEE;
            }

            const reward = amount.div(MAX_CASE);

            return (amount.sub(fee)).add(reward).toString();
        }
    });



    // 승패에 따라 이벤트가 발생하고 이긴 경우 상금이 맞는지 확인
    it("should have the valid result", async () => {

        const val = 0.12;
        const mask = 1; //Tails 0000 0001

        await this.instance.placeBet(mask, {from:player1, value:web3.utils.toWei(val.toString(), "ether")});

        //console.log(this.getWinningAmount(web3.utils.toWei(val.toString(), "ether")));

        const receipt = await this.instance.revealResult({from: player1});

        if (receipt.logs !== undefined && receipt.logs.length > 0) {

            const zero = new this.BN(0);
            let amount;

            receipt.logs.forEach((log) => {

                let eventName = log.event;
                //console.log(eventName);
                switch (eventName) {
                    case "Reveal" :

                        assert.equal(log.args.gambler, player1, "Invalid gambler account");

                        amount = new this.BN(log.args.amount);

                        if (log.args.reveal.toString() === mask.toString()) {
                            console.log("Won!");
                            assert(amount.gt(zero), "Winning amount should be greater than zero");
                        } else {
                            console.log("Lost!");
                            assert(amount.eq(zero), "Winning amount should be zero");
                        }

                        break;

                    case "Payment" :

                        amount = new this.BN(log.args.amount);

                        //console.log("Winning amount=" + amount.toString());
                        assert.equal(log.args.beneficiary, player1, "Invalid Beneficiary account");

                        //console.log(this.getWinningAmount(web3.utils.toWei(val.toString(), "ether")));
                        const a = new this.BN(this.getWinningAmount(web3.utils.toWei(val.toString(), "ether")));
                        const b = new this.BN(amount.toString());
                        assert(a.eq(b), "Winning amount is not the expected value");

                        break;

                    default:
                        assert.isOk(true);
                }

            })

        } else {
            assert.isOk(false, "Events are not emitted");
        }
    });




});
