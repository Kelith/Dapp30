pragma solidity ^0.8.0;

contract HelloWorld {
    // pure means "readonly". Memory means I'm not saving anything on the blockchain
    function hello() pure public returns(string memory) {
        return 'Hello World';
    }
}