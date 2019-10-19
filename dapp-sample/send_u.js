//메타마스크 계정
module.exports = function(callback) {

    const toAddr = "0x583031d1113ad414f02576bd6afabfb302140225";

    web3.eth.getAccounts().then((accounts) => {
        web3.eth.sendTransaction(
            {from:accounts[1],
                to: toAddr,
                value:web3.utils.toWei("10", "ether")}, callback);
    });
}
