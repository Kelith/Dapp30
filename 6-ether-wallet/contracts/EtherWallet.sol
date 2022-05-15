pragma solidity ^0.8.0;

contract EtherWallet {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function deposit() public payable {
    }

    function send(address payable to, uint amount) public {
        if(msg.sender == owner){
            to.transfer(amount);
            return;
        }
        revert('Sender is not allowed');
    }

    function balanceOf() view public returns(uint) {
        return address(this).balance;
    }


}