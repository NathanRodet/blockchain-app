// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Ticket is ERC721Enumerable {
    enum TicketPrice { Train, Bus, Subway }
    mapping(TicketPrice => uint256) private ticketPrice;

    struct TicketInfo {
        string name;
        TicketPrice ticketPrice;
        string imageUrl;
        string description;
    }

    uint256 private _nextTicketId = 1;
    mapping(uint256 => TicketInfo) public tickets;
    mapping(address => bool) public admins;

    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);
    event TicketCreated(uint256 indexed ticketId, string name);
    event TicketBought(uint256 indexed ticketId, address indexed buyer);

    constructor() ERC721("Ticket", "TCKTPRC") {
        
        ticketPrice[TicketPrice.Bus] = 1;
        ticketPrice[TicketPrice.Subway] = 2;
        ticketPrice[TicketPrice.Train] = 3;
    }

    function createTicket(string memory name, TicketPrice ticketPrice, string memory imageUrl, string memory description) public {
        tickets[_nextTicketId] = TicketInfo(name, ticketPrice, imageUrl, description);
        emit TicketCreated(_nextTicketId, name);
        _nextTicketId++;
    }

    function buyTicket(uint256 ticketId) public payable {
        require(msg.value >= ticketPrice[TicketPrice(ticketId)], "Ether sent is not enough");
        
        _safeMint(msg.sender, ticketId);
        emit TicketBought(ticketId, msg.sender);
    }

}
