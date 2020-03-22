//메타마스크 계정
module.exports = function(callback) {

    const toAddr = "0x4b005a94bb23104d05495f15d2308bd908500e6c";
    web3.eth.getAccounts().then((accounts) => {
        web3.eth.sendTransaction(
            {from:accounts[2],
               to:toAddr,
               value:web3.utils.toWei("10", "ether")}, callback());
    });
}
