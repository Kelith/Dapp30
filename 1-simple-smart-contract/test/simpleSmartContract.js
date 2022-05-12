const SimpleSmartContract = artifacts.require('SimpleSmartContract')

// Contract , callback with tests
contract('SimpleSmartContract', () => {
    it('Should deploy smart contract properly', async () => {
        // deployed() DOES NOT deploy a contract by itself. It returns a js object pointing to an already deployed smart contract with migrations.
        const simpleSmartContract = await SimpleSmartContract.deployed()
        console.log(simpleSmartContract.address)
        assert(simpleSmartContract.address != '')
    })
})