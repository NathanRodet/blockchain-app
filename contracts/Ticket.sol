// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Tickets  {
    enum TicketType { Train, Bus, Subway }
    mapping(TicketType => uint256) private defaultTicketPrice;

    struct Ticket {
        string name;
        TicketType ticketType;
        string imageUrl;
        string description;
        bool isUsed;
    }

    uint256 private _nextTicketId = 1;
    mapping(uint256 => Ticket) public tickets;
    mapping(address => bool) public admins;

    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);
    event TicketCreated(uint256 indexed ticketId, string name);
    event TicketBought(uint256 indexed ticketId, address indexed buyer);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Caller is not an admin");
        _;
    }

    function addAdmin(address admin) public onlyAdmin {
        admins[admin] = true;
        emit AdminAdded(admin);
    }

    function removeAdmin(address admin) public onlyAdmin {
        admins[admin] = false;
        emit AdminRemoved(admin);
    }

    constructor() {
        admins[msg.sender] = true;

        defaultTicketPrice[TicketType.Bus] = 1;
        defaultTicketPrice[TicketType.Subway] = 2;
        defaultTicketPrice[TicketType.Train] = 3;
    }

    // TODO: Calculate the price of the ticket with the biggest reduction available


    function createTicket(string memory name, TicketType ticketType, string memory imageUrl, string memory description) public onlyAdmin {
        tickets[_nextTicketId] = Ticket(name, ticketType, imageUrl, description, false);
        
        emit TicketCreated(_nextTicketId, name);
        _nextTicketId++;
    }

    function buyTicket(uint256 ticketId) public payable {
        // TODO: Require the price with the biggest reduction available for a ticket to be bought

        // TODO: Replace the checked price by the one with the biggest reduction available
        require(msg.value >= defaultTicketPrice[TicketType(ticketId)], "The Ether does not match the price of the item");

        emit TicketBought(ticketId, msg.sender);
    }

}
