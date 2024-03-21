// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PrivilegeCard is ERC721Enumerable {
    uint256[] private safeDiscountPercentages = [25, 50, 75];
    uint256[] private test;

    struct Card {
        uint id;
        string name;
        uint256 price;
        uint256 discountRate;
        uint256 quantity;
        string imageUrl;
        string description;
    }

    uint256 private _nextCardId = 0;
    mapping(uint256 => Card) public cards;
    mapping(address => bool) public admins;
    address[] private adminAddresses;
    address[] private owners;

    mapping(address => uint256[]) private ownedCards;
    mapping(uint256 => uint256) private ownedCardsIndex;

    event AdminAdded(address indexed newAdmin);
    event AdminRemoved(address indexed removedAdmin);
    event CardCreated(uint256 indexed cardId, string name, uint256 quantity);
    event CardDeleted(uint256 indexed cardId, string name);
    event CardBought(
        uint256 indexed cardId,
        address indexed buyer,
        uint256 quantityLeft
    );
    event CardTransferred(
        uint256 indexed cardId,
        address indexed from,
        address indexed to
    );
    event RefundIssued(address indexed buyer, uint256 amount);

    constructor() ERC721("PrivilegeCard", "PRVC") {
        createCard(
            "Gold",
            0.000000000000000007 ether,
            75,
            100,
            "https://i.imgur.com/H9ufH3W.png",
            "Gold Card Description"
        );
        createCard(
            "Silver",
            0.000000000000000005 ether,
            50,
            100,
            "https://i.imgur.com/EjLJEfi.png",
            "Silver Card Description"
        );
        createCard(
            "Bronze",
            0.000000000000000002 ether,
            25,
            1000,
            "https://i.imgur.com/OLRrRmQ.png",
            "Bronze Card Description"
        );
    }

    function addAdmin(address admin) public {
        admins[admin] = true;
        adminAddresses.push(admin);
        emit AdminAdded(admin);
    }

    function removeAdmin(address admin) public {
        admins[admin] = false;
        emit AdminRemoved(admin);
    }

    function getAllAdmins() external view returns (address[] memory) {
        return adminAddresses;
    }

    function isAdmin(address user) public view returns (bool) {
        return admins[user];
    }

    function isValidDiscountPercentage(
        uint256 discount
    ) private view returns (bool) {
        for (uint i = 0; i < safeDiscountPercentages.length; i++) {
            if (safeDiscountPercentages[i] == discount) {
                return true;
            }
        }
        return false;
    }

    function createCard(
        string memory name,
        uint256 price,
        uint256 discountRate,
        uint256 quantity,
        string memory imageUrl,
        string memory description
    ) public {
        require(quantity > 0, "Quantity must be at least 1");
        require(
            isValidDiscountPercentage(discountRate),
            "Invalid discount rate"
        );

        uint id = _nextCardId;
        cards[_nextCardId] = Card(
            id,
            name,
            price,
            discountRate,
            quantity,
            imageUrl,
            description
        );
        emit CardCreated(_nextCardId, name, quantity);
        _nextCardId++;
    }

    function deleteCard(uint cardId) public {
        require(cardId >= 0, "Card does not exist");
        require(cards[cardId].quantity > 0, "Card already deleted");

        Card storage cardToDelete = cards[cardId];
        cardToDelete.quantity = 0;

        if (cardId == _nextCardId) {
            delete cards[cardId];
        }

        emit CardDeleted(cardId, cardToDelete.name);
    }

    function buyCard(uint256 cardId) public payable {
        require(msg.value >= cards[cardId].price, "Ether sent is not enough");

        Card storage card = cards[cardId];
        card.quantity = card.quantity - 1;

        ownedCards[msg.sender].push(cardId);

        _safeMint(msg.sender, cardId);
        emit CardBought(cardId, msg.sender, card.quantity);

        uint256 excessPayment = msg.value - card.price;
        owners.push(msg.sender);
        if (excessPayment > 0) {
            payable(msg.sender).transfer(excessPayment);
            emit RefundIssued(msg.sender, excessPayment);
        }
    }

    function getAvailableCards() public view returns (Card[] memory) {
        uint256 availableCount = 0;
        for (uint256 i = 0; i < _nextCardId; i++) {
            if (cards[i].quantity > 0) {
                availableCount++;
            }
        }

        Card[] memory availableCards = new Card[](availableCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < _nextCardId; i++) {
            if (cards[i].quantity > 0) {
                availableCards[counter] = cards[i];
                counter++;
            }
        }
        return availableCards;
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
        require(
            ownerOf(cardId) == msg.sender,
            "You are not the owner of this card"
        );
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
    
    function getCardWithBiggestReduction() public view returns (Card memory) {
        uint256 biggestReduction = 0;
        uint256 cardIdWithBiggestReduction = 0;
        for (uint256 i = 1; i < _nextCardId; i++) {
            if (cards[i].discountRate > biggestReduction) {
                biggestReduction = cards[i].discountRate;
                cardIdWithBiggestReduction = i;
            }
        }
        return cards[cardIdWithBiggestReduction];
    }
}
