pragma solidity ^0.8.0;

contract SimpleStorage {
    string public data;  // When declared outside the scope of a function, a variable is saved on the blockchain

    function setData(string memory _data) public {
        data = _data;
    }

    // view keyword tells evm to do a call, not a transaction. It means readonly
    function getData() public view returns (string memory){
        return data;
    }
}