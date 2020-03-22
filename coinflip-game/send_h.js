//컨트랙트
module.exports = function(callback) {

    const toAddr = "0xEf0F089f0D03fF4CC1a3188068D190109126379F";
    web3.eth.getAccounts().then((accounts) => {
        web3.eth.sendTransaction(
            {from:accounts[2],
               to:toAddr,
               value:web3.utils.toWei("10", "ether")}, callback());
    });
}
