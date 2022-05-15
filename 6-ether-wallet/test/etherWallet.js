const { assert } = require("console");

const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', (accounts) => {
  let etherWallet = null;
  before(async () => {
    etherWallet = await EtherWallet.deployed();
  });

  it('Should set accounts[0] as owner', async () => {
    const owner = await etherWallet.owner();
    assert(owner === accounts[0])
  })

  it('Should deposit ether', async () => {
    await etherWallet.deposit({from: accounts[0], value:100});
    const result = await web3.eth.getBalance(etherWallet.address);
    assert(parseInt(result) === 100);
  })

  it('Should return the balance of the contract', async () => {
    const balance = await etherWallet.balanceOf();
    assert(parseInt(balance) === 100);
  })

  it('Should transfer ether to address', async () => {
    const recipientBalanceBefore =  await web3.eth.getBalance(accounts[1]);
    await etherWallet.send(accounts[1], 50, {from: accounts[0]});
    const walletBalance = await web3.eth.getBalance(etherWallet.address);
    const recipientBalanceAfter =  await web3.eth.getBalance(accounts[1]);
    assert(parseInt(walletBalance) == 50);
    assert(web3.utils.toBN(recipientBalanceBefore).sub(web3.utils.toBN(recipientBalanceAfter)).toNumber() == 50);
  })

  it('Should NOT transfer ether if tx is sent by someone who\'s not the owner', async () =>{
    try{
      await etherWallet.send(accounts[1], 50, {from: acocunts[2]})
    }catch(e){
      assert(e.message.includes('sender is not allowed'))
      return;
    }
    // If the contract didn't throw an error is also a problem!
    assert(false)
  })
});
