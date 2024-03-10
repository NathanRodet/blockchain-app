// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;
import "./PrivilegeCard.sol";

contract TicketFactory is PrivilegeCard {
  enum TicketType { Train, Bus, Subway }
  mapping(TicketType => uint256) private defaultTicketPrice;

  struct Ticket {
    TicketType ticketType;
    bool isUsed;
  }

  mapping(address => Ticket[]) private tickets;

  event TicketPurchased(address indexed buyer, TicketType ticketType, uint256 price);

  constructor() {
    defaultTicketPrice[TicketType.Train] = 3;
    defaultTicketPrice[TicketType.Bus] = 1;
    defaultTicketPrice[TicketType.Subway] = 2;
  }

  function generateTicket(TicketType ticketType) public {
    Ticket memory newTicket = Ticket(ticketType, false);
    tickets[msg.sender].push(newTicket);
  }

  function calculateTicketPrice(TicketType ticketType) public view onlyAdmin returns (uint256) {
    uint256 basePrice = defaultTicketPrice[ticketType];
    DiscountRate discountRate = getBiggestReduction();

    return basePrice - (basePrice * discountPercentages[discountRate] / 100);
  }

  function buyTicket(TicketType ticketType) public payable {
    uint256 ticketPrice = calculateTicketPrice(ticketType);
    require(ticketPrice > 0, "Ticket type not available");
    require(msg.value >= ticketPrice, "Insufficient funds");

    Ticket memory newTicket = Ticket(ticketType, false);
    tickets[msg.sender].push(newTicket);

    emit TicketPurchased(msg.sender, ticketType, ticketPrice);
  }

  function listTickets(address buyer) public view returns (Ticket[] memory) {
    return tickets[buyer];
  }
}
