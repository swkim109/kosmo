//메타마스크 계정
module.exports = function(callback) {

    const toAddr = "0xAFc4F9F3bA806dd2F8e47A524fFDa2418bBFc08a";
    web3.eth.getAccounts().then((accounts) => {
        web3.eth.sendTransaction(
            {from:accounts[1],
               to: toAddr,
               value:web3.utils.toWei("10", "ether")}, callback);
    });
}
