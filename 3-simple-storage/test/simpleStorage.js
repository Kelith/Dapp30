const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', () => {
    it('Should set the value of data variable', async () => {
        const simpleStorage = await SimpleStorage.deployed();
        await simpleStorage.setData("hello");
        const result = await simpleStorage.getData();
        assert(result === 'hello');
    })
})