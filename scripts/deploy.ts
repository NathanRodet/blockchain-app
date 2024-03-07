import { ethers } from "hardhat";
import { PrivilegeCard } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const token: PrivilegeCard = await ethers.deployContract("PrivilegeCard");
  console.log("Token address:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });