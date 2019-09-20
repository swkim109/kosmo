//컨트랙트
module.exports = function(callback) {

    const toAddr = "0x570e4877495F110BAbB949FC09A162fC1A29E7F6";
    web3.eth.getAccounts().then((accounts) => {
        web3.eth.sendTransaction(
            {from:accounts[1],
               to: toAddr,
               value:web3.utils.toWei("10", "ether")}, callback);
    });
}
