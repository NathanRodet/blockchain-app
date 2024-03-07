import { expect } from "chai";
import { ethers } from "hardhat";
import { PrivilegeCard } from "../typechain-types";
import { Signer } from "ethers";

describe("PrivilegeCard", function () {
  let privilegeCard: PrivilegeCard;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    privilegeCard = await ethers.deployContract("PrivilegeCard");
  });

  describe("Administration", function () {
    it("Should allow the owner to add an admin", async function () {
      await privilegeCard.addAdmin(await addr1.getAddress());
      expect(await privilegeCard.admins(await addr1.getAddress())).to.equal(true);
    });

    it("Should allow the owner to remove an admin", async function () {
      const addr1Address = await addr1.getAddress();
      await privilegeCard.addAdmin(addr1Address);
      await privilegeCard.removeAdmin(addr1Address);
      expect(await privilegeCard.admins(addr1Address)).to.equal(false);
    });
  });

  describe("Card Management", function () {
    beforeEach(async function () {
      await privilegeCard.addAdmin(await owner.getAddress());
    });

    it("Should allow an admin to create a card", async function () {
      await privilegeCard.createCard("Gold", ethers.parseEther("1"), 0, 10, "http://0nlyF@n-MYM.com/HERE-COMES-THE-MONEY.png", "Discount Card Description");
      const card = await privilegeCard.cards(1);
      expect(card.name).to.equal("Gold");
    });

    it("Should allow a user to buy a card", async function () {
      await privilegeCard.createCard("Gold", ethers.parseEther("1"), 0, 10, "http://0nlyF@n-MYM.com/HERE-COMES-THE-MONEY.png", "Discount Card Description");
      await privilegeCard.connect(addr1).buyCard(1, { value: ethers.parseEther("1") });
      expect(await privilegeCard.ownerOf(1)).to.equal(await addr1.getAddress());
    });

    it("Should allow the card owner to transfer a card", async function () {
      await privilegeCard.createCard("Gold", ethers.parseEther("1"), 0, 10, "http://0nlyF@n-MYM.com/HERE-COMES-THE-MONEY.png", "Discount Card Description");
      await privilegeCard.connect(addr1).buyCard(1, { value: ethers.parseEther("1") });
      await privilegeCard.connect(addr1).transferCard(1, await addr2.getAddress());
      expect(await privilegeCard.ownerOf(1)).to.equal(await addr2.getAddress());
    });
  });
});
