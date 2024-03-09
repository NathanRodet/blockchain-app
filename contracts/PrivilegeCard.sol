// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PrivilegeCard is ERC721Enumerable {
    enum DiscountRate { None, TenPercent, TwentyFivePercent, FiftyPercent }
    mapping(DiscountRate => uint256) private discountPercentages;

    struct Card {
        string name;
        uint256 price;
        DiscountRate discountRate;
        uint256 quantity;
        string imageUrl;
        string description;
    }

    uint256 private _nextCardId = 1;
    mapping(uint256 => Card) public cards;
    mapping(address => bool) public admins;

    mapping(address => uint256[]) private ownedCards;
    mapping(uint256 => uint256) private ownedCardsIndex;

    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);
    event CardCreated(uint256 indexed cardId, string name, uint256 quantity);
    event CardBought(uint256 indexed cardId, address indexed buyer, uint256 quantityLeft);
    event CardTransferred(uint256 indexed cardId, address indexed from, address indexed to);
    event RefundIssued(address indexed buyer, uint256 amount);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Caller is not an admin");
        _;
    }

    constructor() ERC721("PrivilegeCard", "PRVC") {
        admins[msg.sender] = true;
        
        discountPercentages[DiscountRate.None] = 0;
        discountPercentages[DiscountRate.TenPercent] = 10;
        discountPercentages[DiscountRate.TwentyFivePercent] = 25;
        discountPercentages[DiscountRate.FiftyPercent] = 50;
    }

    function addAdmin(address admin) public onlyAdmin {
        admins[admin] = true;
        emit AdminAdded(admin);
    }

    function removeAdmin(address admin) public onlyAdmin {
        admins[admin] = false;
        emit AdminRemoved(admin);
    }

    function createCard(string memory name, uint256 price, DiscountRate discountRate, uint256 quantity, string memory imageUrl, string memory description) public onlyAdmin {
        require(quantity > 0, "Quantity must be at least 1");
        cards[_nextCardId] = Card(name, price, discountRate, quantity, imageUrl, description);
        emit CardCreated(_nextCardId, name, quantity);
        _nextCardId++;
    }

    function buyCard(uint256 cardId) public payable {
        require(cards[cardId].quantity > 0, "Card is sold out");
        require(msg.value >= cards[cardId].price, "Ether sent is not enough");

        Card storage card = cards[cardId];
        card.quantity = card.quantity - 1;
        
        ownedCards[msg.sender].push(cardId);
        ownedCardsIndex[cardId] = ownedCards[msg.sender].length - 1;

        _safeMint(msg.sender, cardId);
        emit CardBought(cardId, msg.sender, card.quantity);

        uint256 excessPayment = msg.value - card.price;
        if (excessPayment > 0) {
            payable(msg.sender).transfer(excessPayment);
            emit RefundIssued(msg.sender, excessPayment);
        }
    }

    function getOwnedCards(address owner) public view returns (Card[] memory) {
        uint256[] storage cardIds = ownedCards[owner];
        Card[] memory cardsArray = new Card[](cardIds.length);

        for (uint256 i = 0; i < cardIds.length; i++) {
            cardsArray[i] = cards[cardIds[i]];
        }

        return cardsArray;
    }

    function transferCard(uint256 cardId, address to) public {
        require(ownerOf(cardId) == msg.sender, "You are not the owner of this card");
        _transfer(msg.sender, to, cardId);

        uint256 lastCardIndex = ownedCards[msg.sender].length - 1;
        uint256 cardIndex = ownedCardsIndex[cardId];
        if (cardIndex != lastCardIndex) {
            uint256 lastCardId = ownedCards[msg.sender][lastCardIndex];
            ownedCards[msg.sender][cardIndex] = lastCardId;
            ownedCardsIndex[lastCardId] = cardIndex;
        }
        ownedCards[msg.sender].pop();
        delete ownedCardsIndex[cardId];

        ownedCards[to].push(cardId);
        ownedCardsIndex[cardId] = ownedCards[to].length - 1;

        emit CardTransferred(cardId, msg.sender, to);
    }
}