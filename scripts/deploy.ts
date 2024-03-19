import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const PrivilegeCardContract = await ethers.getContractFactory("PrivilegeCard");
  const TicketFactory = await ethers.getContractFactory("TicketFactory");

  const privilegeCard = await PrivilegeCardContract.deploy();
  const ticketFactory = await TicketFactory.deploy();

  console.log("PrivilegeCard contract address:", await privilegeCard.getAddress());
  console.log("TicketFactory contract address:", await ticketFactory.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });