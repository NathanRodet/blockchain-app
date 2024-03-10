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
    uint256 discountRate = getBiggestReduction();

    return basePrice - (basePrice * discountRate / 100);
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

  function listAvailableTickets() public view returns (TicketType[] memory, uint256[] memory) {
    TicketType[] memory availableTickets = new TicketType[](3);
    uint256[] memory ticketPrices = new uint256[](3);

    availableTickets[0] = TicketType.Train;
    availableTickets[1] = TicketType.Bus;
    availableTickets[2] = TicketType.Subway;

    ticketPrices[0] = defaultTicketPrice[TicketType.Train];
    ticketPrices[1] = defaultTicketPrice[TicketType.Bus];
    ticketPrices[2] = defaultTicketPrice[TicketType.Subway];

    return (availableTickets, ticketPrices);
  }
}