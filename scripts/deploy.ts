import { ethers } from "hardhat";
import { PrivilegeCard } from "../typechain-types";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", owner.address);

  const PrivilegeCardContract: PrivilegeCard = await ethers.deployContract("PrivilegeCard");
  const TicketContract: PrivilegeCard = await ethers.deployContract("Ticket");

  console.log("PrivilegeCard contract address:", await PrivilegeCardContract.getAddress());
  console.log("Ticket contract address:", await TicketContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });