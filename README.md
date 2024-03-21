# blockchain-app

## Quick start

The first things you need to do are cloning this repository and installing its dependencies:

```bash
git clone https://github.com/NathanRodet/blockchain-app.git
cd blockchain-app
npm install
```

Once installed, let's run Hardhat's testing network:

```bash
npx hardhat node
```
Don't forget to copy one the private key as it will be required after.

```bash
npm install ganache --global
ganache
```

Then, on a new terminal, go to the repository's root folder and run this to deploy your contract:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

Finally, we can run the frontend with:

```bash
npm install -g @angular/cli
cd frontend
npm install
ng serve --open
```

> If you are running on Windows, you should run this command.  
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

## 1 - Connecting to the blockchain with metamask

Download and install metamask on your browser from this link : https://metamask.io/download/.
Connect to your wallet or follow the instructions to create a new one.
Click on the plugin icon then metamask to open the menu.
Click on the vertical "...", then "settings" -> "advanced" and scroll down to set "Show test networks" to true.
Click on the top left icon to select a network, then click "add network", then "add network manually" at the bottom of the page.
Name it as you wish, set "http://localhost:8545" as new RPC URL, 31337 as "Chain ID" then "ETH" as the symbol.

CLick save then switch to the newly created network.
Once you switched network, click on your account name, then add "account or hardware wallet" -> "import account" and paste the private key you copied before. You have now an account with a 1000 eth, allowing you to perform any kind of operation on our site.
Make sure you disconnect from the previous account and are using the correct one.
You can login following the instructions on screen.


## 2 - Project overview

We are creating the web3 site for SupRailRoad, allowing users to buy tickets for different means of transport.
This site works with the blockchain to enable feautures that will be detailed below like prooving you're the owner of the ticket or transfering it

We built the front end with angular and the back end in solidity.

## 3 - Features

- Admin can create privilege cards (name, price image, description and avalaible in a definite amount).
- Users can buy the cards.
- Users can buy, list and transfer his tickets (with the greater discount provided by the privilege cards he owns).

