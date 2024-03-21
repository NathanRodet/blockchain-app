# Blockchain-app

SupRailRoad & Co is developing a Proof of Concept (PoC) for a comprehensive application aimed at revolutionizing ticketing services for all commuters using the company's transportation services, including trains, subways, and buses. In response to advancements in technology, the company is moving away from traditional paper tickets and embracing a digital solution that will enable users to purchase tickets and order reduction cards seamlessly. This application will utilize blockchain technology to ensure secure transactions and facilitate interoperability across various transportation companies throughout Europe, transcending national boundaries.

The user interface is built with Angular with Etherjs, and the contracts are build with solidity and hardhat.

## Features

- Admin can create privilege cards (name, price image, description and avalaible in a definite amount).
- Users can buy, list and transfer his cards (with the greater discount provided by the privilege cards he owns).
- Users can buy the tickets.

## Quick start

### Clone the repository

```bash
# Cloning the repository

git clone https://github.com/NathanRodet/blockchain-app.git
```

### Setup the contracts and ganache network

```bash
# Installing the dependencies
cd blockchain-app
npm ci

# Build the contracts
npm run build

# This will start the ganache network on the port 7545
# Please, copy a private key logged by ganache in the terminal, you will need it later.
npm install ganache --global
npm run local-network
```

### Build and run the DApps

```bash
# Installing the dependencies
npm install -g @angular/cli

cd frontend
npm ci
ng serve --open
# Then connect to the logged local url.
```

> If you are running on Windows, you should run this command.  
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

### Connecting to the blockchain with metamask

1. To get started, download and install Metamask on your browser by following this link: https://metamask.io/download/.
2. Once installed, connect to your wallet or create a new one by following the instructions.
3. To access the menu, click on the Metamask plugin icon and then select 'Settings' from the vertical menu.
4. In the 'Advanced' section, scroll down and set 'Show test networks' to true.
5. To select a network, click on the top left icon and then select 'Add Network'. Finally, click on 'Add Network Manually' at the bottom of the page.
6. Name the RPC URL as desired, then set it to 'http://localhost:7545'. Set the Chain ID to 1337 and use 'ETH' as the symbol.
7. After clicking save, switch to the newly created network.
8. Then, click on your account name and select 'import account' under 'account or hardware wallet'.
9. Paste the previously copied private key to import the account. You now have an account with 1000 ETH, which allows you to perform any operation on our site.
10. Ensure that you have disconnected from the previous account and are using the correct one.
11. Follow the on-screen instructions to log in.
