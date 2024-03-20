// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./PrivilegeCard.sol";

contract TicketFactory is PrivilegeCard {

  enum TicketType { Train, Bus, Subway }

  struct Ticket {
    TicketType ticketType;
    uint256 defaultPrice;
    string imageUrl;
    string description;
  }

  uint256 private _nextTicketId = 0;
  mapping(address => Ticket[]) private ownedTickets;
  mapping(uint256 => Ticket) private availableTickets;

  event TicketCreated(TicketType ticketType, uint256 price, string imageUrl, string description);
  event ReductionCalculated(TicketType ticketType, uint256 oldPrice, uint256 newPrice, uint256 discountRate);
  event TicketPurchased(address indexed buyer, TicketType ticketType, uint256 price, Card usedReductionCard);

  constructor() {
    createTicket(
      TicketType.Train,
      0.000000000000000007 ether,
      "https://imgur.com/gallery/2i6sxXq",
      "Train Ticket Description"
      );

    createTicket(TicketType.Bus,
      0.000000000000000005 ether,
      "https://imgur.com/gallery/72NIX",
      "Bus Ticket Description"
      );

    createTicket(TicketType.Subway,
      0.000000000000000003 ether,
      "https://imgur.com/gallery/RTKiGZD",
      "Subway Ticket Description"
      );
  }

  function createTicket(TicketType ticketType, uint256 defaultPrice, string memory imageUrl, string memory description) private {
    uint256 ticketId = _nextTicketId;

    availableTickets[ticketId] = Ticket(ticketType, defaultPrice, imageUrl, description);
    _nextTicketId++;

    emit TicketCreated(ticketType, defaultPrice, imageUrl, description);
  }

  function calculateTicketPrice(Ticket memory selectedTicket ) public returns (uint256) {
    uint256 defaultPrice = selectedTicket.defaultPrice;
    TicketType ticketType = selectedTicket.ticketType;
    Card memory reductionCard = getCardWithBiggestReductionOwned();
    uint256 discountRate = reductionCard.discountRate;
    uint256 newPrice = defaultPrice - (defaultPrice * discountRate / 100);

    emit ReductionCalculated(ticketType, defaultPrice, newPrice, discountRate);
    return newPrice;
  }

  function buyTicket(Ticket memory selectedTicket) public payable {
    uint256 ticketPrice = calculateTicketPrice(selectedTicket);
    TicketType ticketType = selectedTicket.ticketType;
    require(ticketPrice > 0, "Ticket type not available");
    require(msg.value == ticketPrice, "Insufficient funds or incorrect price");

    ownedTickets[msg.sender].push(selectedTicket);
    emit TicketPurchased(msg.sender, ticketType, ticketPrice, getCardWithBiggestReductionOwned());
  }

  function listOwnedTickets(address buyer) public view returns (Ticket[] memory) {

    return ownedTickets[buyer];
  }

  function listAvailableTickets() public view returns (Ticket[] memory) {
    Ticket[] memory tickets = new Ticket[](_nextTicketId);
    for (uint256 i = 0; i < _nextTicketId; i++) {
      tickets[i] = availableTickets[i];
    }
    return tickets;
  }

}
