# blockchain-app

## Developement installation

```bash
npm install --save-dev hardhat
npm install --save-dev ts-node typescript
npm install --save-dev chai@4 @types/node @types/mocha @types/chai@4
```

## 1 - Project overview

You are part of SupRailRoad & co and as such are task to provide a PoC for a solution being designed to be use by all people using the company (train, subway, bus ...)
With this new era of technology, the company want to ditch the old paper ticket and provide a full solution allowing people to order reduction cards but also ticket. This need to be using blockchain technology as this is to be used by all companies in Europe and not just your country.

The project can be done by teams of 3 peoples maximum

This project is about building both the frontend and the contracts needed. If one is missing your grade will automatically be 0

## 2 - Features

Your project is to build a website and smart contracts allowing you and your customers to buy privilege card and book a trip. In a certain way this can be seen as using some functionalities of OpenSea (or other NFT trading solutions)

Here are the basics overview of the functionalities. Of course, quality and security are directly impacting your production

### Privilege card

- allow "admin" to create multiples cards
- each card available in a certain amount
- each card with a specific name, price, number of card, image and description
- allow user to "buy" them

### User

- can buy a privilege card
- card can be listed on a specific page
- card can be sold to someone else (and /or sent)

### Ticket

- users can buy a train / bus / subway ticket
- base price for the ticket is the same
- a reduction is applied based on the cards owned by the user
- only the card with the biggest advantage is used (so 3 cards with 10% / 25% / 50% in the account, only the 50% is used)
- tickets are not refundable

## 3 - Tips

### Contracts

- Start building on default contract and expend around it.
- No need to implement all feature before trying to build your interface
- Depending on the number of tests and how you build your solution it can take time to have enough "free ETH" to run everything on a test network (you are limited to 0.1 eth/day from the faucets)
- try to test the contracts and deploys

### Frontend

- You are free to design your own interface but it is expected to be usable without to much hasle
- Quality of your code will matter
- Try to think about optimization (both on how to work with the contract but also on your frontend code)
- Think about your users ! Display error, warning and helps
  Documentation

### General

- Write a good and easy to follow documentation
- Think about edge cases and display that you were able to think about them
- Writing automated tests is a great way to display that your features are working
- If you use different tool, explain which one and why. And don't forget to add a readme for the setup

## 4 - Deliverables

You need to submit an archive containing the source code of your project both frontend and contract. You also need to provide a full documentation of your solution and how to install it if necessary. In case of missing information (or not working) you will lose some points

## 5 - Graded items

Contract: 8pts

Frontend: 8pts

Documentation: 4pts
