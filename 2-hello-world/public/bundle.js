var contractABI = [
    {
      "inputs": [],
      "name": "hello",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "pure",
      "type": "function",
      "constant": true
    }
  ];
var contractAddress = '0x00dD65fF192f81CDDE41b4df5154055046EfEC2d';
var web3 = new Web3('http://localhost:9545');
var helloWorld = new web3.eth.Contract(contractABI,contractAddress);

document.addEventListener('DOMContentLoaded', ()=> {
    helloWorld.methods.hello().call()
        .then(result => {
            document.getElementById("hello").innerHTML = result
        })
})

