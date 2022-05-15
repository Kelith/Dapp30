const Escrow = artifacts.require('Escrow');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('Escrow', accounts => {
  let escrow = null;
  const [lawyer, payer, reciepient] = accounts;
  before(async () =>{
    escrow = await Escrow.deployed();
  })

  it('Should deposit', async () => {
    await escrow.deposit({from:payer, value:900})
    const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address))
    assert(escrowBalance === 900);
  })

  it('Should not deposit if sender is not the payer', async () => {
    assertError(escrow.deposit({from: accounts[6], value:100}), 'Sender must be the payer')
  })

  it('Should NOT deposit if transfer exceed amount', async () =>{
    assertError(escrow.deposit({from: payer, value:10000}), 'Cant send more than escrow amount')
  })

  it('Should not release funds before receiving full amount', async () =>{
    assertError(escrow.release({from: lawyer}), 'cannot release funds before full amount is sent')
  })

  it('Should not release funds to someone different from the lawyer', async () => {
    // Need full amount or I'll trigger the first require statement
    escrow.deposit({from:payer, value:100});
    assertError(escrow.release({from: accounts[6]}), 'only lawyer can release funds')
  })

  it('Should release funds', async () =>{
    const balanceRecipientBefore = web3.utils.toBN(await web3.eth.getBalance(recipient))
    await escrow.release({from:lawyer});
    const balanceRecipientAfter = web3.utils.toBN(await web3.eth.getBalance(recipient))
    assert(balanceRecipientAfter.sub(balanceRecipientBefore).toNumber() === 1000)
  })
});

