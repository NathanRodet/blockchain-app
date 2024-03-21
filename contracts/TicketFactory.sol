// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./PrivilegeCard.sol";

contract TicketFactory is PrivilegeCard {
    uint256 private nonce;

    struct Ticket {
        uint id;
        string ticketType;
        uint256 defaultPrice;
        string imageUrl;
        string description;
    }

    uint256 private _nextTicketId = 0;
    mapping(address => Ticket[]) private ownedTickets;
    mapping(uint256 => Ticket) private availableTickets;

    event TicketCreated(
        string ticketType,
        uint256 price,
        string imageUrl,
        string description
    );
    event TicketPurchased(address indexed buyer, uint256 complexId);

    constructor() {
        createTicket(
            "Train",
            0.000000000000000007 ether,
            "https://i.imgur.com/2i6sxXq.jpeg",
            "Our fabulous train ticket"
        );

        createTicket(
            "Bus",
            0.000000000000000005 ether,
            "https://i.imgur.com/VVjFRTj.jpeg",
            "Our fabulous bus ticket"
        );

        createTicket(
            "Subway",
            0.000000000000000003 ether,
            "https://i.imgur.com/HE1hW7B.jpeg",
            "Our fabulous subway ticket"
        );

        nonce = 0;
    }

    function createTicket(
        string memory ticketType,
        uint256 defaultPrice,
        string memory imageUrl,
        string memory description
    ) private {
        uint256 ticketId = _nextTicketId;

        availableTickets[ticketId] = Ticket(
            ticketId,
            ticketType,
            defaultPrice,
            imageUrl,
            description
        );
        _nextTicketId++;

        emit TicketCreated(ticketType, defaultPrice, imageUrl, description);
    }

    function calculateTicketPrice(
        string memory ticketType
    ) public view returns (uint256) {
        Ticket memory selectedTicket;
        for (uint256 i = 0; i < _nextTicketId; i++) {
            if (
                keccak256(bytes(availableTickets[i].ticketType)) ==
                keccak256(bytes(ticketType))
            ) {
                selectedTicket = availableTickets[i];
                break;
            }
        }

        uint256 defaultPrice = selectedTicket.defaultPrice;
        Card memory reductionCard = getCardWithBiggestReductionOwned();
        uint256 discountRate = reductionCard.discountRate;
        uint256 newPrice = defaultPrice - ((defaultPrice * discountRate) / 100);

        return newPrice;
    }

    function findTicketIdByType(
        string memory ticketType
    ) private view returns (uint256) {
        for (uint256 i = 0; i < _nextTicketId; i++) {
            if (
                keccak256(abi.encodePacked(availableTickets[i].ticketType)) ==
                keccak256(abi.encodePacked(ticketType))
            ) {
                return i;
            }
        }
        return _nextTicketId;
    }

    function buyTicket(string memory ticketType) public payable {
        uint256 ticketPrice = calculateTicketPrice(ticketType);

        require(msg.value >= ticketPrice, "Ether sent is not enough");

        uint256 ticketId = findTicketIdByType(ticketType);
        require(ticketId != _nextTicketId, "Ticket not found");

        Ticket memory selectedTicket = availableTickets[ticketId];
        ownedTickets[msg.sender].push(selectedTicket);

        _safeMint(msg.sender, ticketId);

        emit TicketPurchased(msg.sender, ticketId);

        uint256 excessPayment = msg.value - ticketPrice;
        if (excessPayment > 0) {
            payable(msg.sender).transfer(excessPayment);
            emit RefundIssued(msg.sender, excessPayment);
        }
    }

    function getOwnedTickets(
        address buyer
    ) public view returns (Ticket[] memory) {
        return ownedTickets[buyer];
    }

    function getAvailableTickets() public view returns (Ticket[] memory) {
        Ticket[] memory tickets = new Ticket[](_nextTicketId);
        for (uint256 i = 0; i < _nextTicketId; i++) {
            tickets[i] = availableTickets[i];
        }
        return tickets;
    }
}
