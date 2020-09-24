//컨트랙트
module.exports = function(callback) {

    const toAddr = "0xA210CB58e654dADf205fa242F0b29850e43478b0";
    web3.eth.getAccounts().then((accounts) => {
        web3.eth.sendTransaction(
            {from:accounts[2],
               to:toAddr,
               value:web3.utils.toWei("10", "ether")}, callback());
    });
}
