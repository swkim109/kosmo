//컨트랙트
module.exports = function(callback) {

    const toAddr = "0x7614fD84aCA24736f12e854ED725742E81e4E810";
    web3.eth.getAccounts().then((accounts) => {
        web3.eth.sendTransaction(
            {from:accounts[2],
               to:toAddr,
               value:web3.utils.toWei("10", "ether")}, callback());
    });
}
