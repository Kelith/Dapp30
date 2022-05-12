var contractABI = [];
var contractAddress = '0x14d8da1F5f85C13ffDc5285cC683ab68c48ea304';
var web3 = new Web3('http://localhost:9545');
var simpleSmartContract = new web3.eth.Contract(contractABI,contractAddress);

console.log(simpleSmartContract)
console.log(web3.eth.getAccounts())
