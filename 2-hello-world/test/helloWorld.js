const { assert } = require("console");

const HelloWorld = artifacts.require('HelloWorld')

contract('HelloWorld', () => {
    it('Should say hello world', async () =>{
        const helloWorld = await HelloWorld.deployed()
        const result = await helloWorld.hello();

        assert(result === 'hello world')
    })
})