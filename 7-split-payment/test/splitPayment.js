const SplitPayment = artifacts.require('SplitPayment');

contract('SplitPayment', (accounts) => {
  let splitPayment = null;
  before(async () => {
    splitPayment = await SplitPayment.deployed();
  });

  it('Should split payment', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [40, 20, 30];
    // promise.all awaits an array of promises at once. GetBalance returns an awaitable, we map them into an array of receipents.
    const initialBalances = await Promise.all(recipients.map(recipient => {
      return web3.eth.getBalance(recipient);
    }));
    await splitPayment.send(
      recipients,
      amounts,
      {from: accounts[0], value: 90} 
    );
    const finalBalances = await Promise.all(recipients.map(recipient => {
      return web3.eth.getBalance(recipient);
    }));
    recipients.forEach((_item, i) => {
      // Balances are big numbers in web3
      const finalBalance = web3.utils.toBN(finalBalances[i]);
      const initialBalance = web3.utils.toBN(initialBalances[i]);
      assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
    });
  });

  it('Should NOT split payment if array length mismatch', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [40, 20];
    try {
      await splitPayment.send(
        recipients,
        amounts,
        {from: accounts[0], value: 90} 
      );
    } catch (e) {
      assert(e.message.includes('to must be same length as amount'));
      return;
    }
    assert(false);
  });

  it('Should NOT split payment if caller is not owner', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [40, 20, 30];
    try {
      await splitPayment.send(
        recipients,
        amounts,
        {from: accounts[5], value: 90} 
      );
    } catch (e) {
      assert(e.message.includes('VM Exception while processing transaction: revert'));
      return;
    }
    assert(false);
  });
});
