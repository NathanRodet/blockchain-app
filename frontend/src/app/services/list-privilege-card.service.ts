import { Injectable } from '@angular/core';
import { ethers, Signer, Provider } from 'ethers';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class ListPrivilegeCardService {
  private contractAddress: string | any;
  private contractABI: any | null;
  private signer: Signer | any;
  private provider: Provider | any;
  private privilegeCardContract: any;

  constructor(private web3Service: Web3Service) {
    Promise.resolve(this.initializeContract());
  }

  private async initializeContract(): Promise<void> {
    this.contractAddress = this.getContractAddress();
    this.contractABI = this.getContractABI();
    this.signer = await this.web3Service.getETHSigner();
    this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
  }

  private getContractAddress(): string | any {
    const contractAddressJson = localStorage.getItem('contractAddress');
    if (!contractAddressJson) {
      throw new Error('Contract address not found in localStorage');
    }
    const contractAddressObject = JSON.parse(contractAddressJson);
    return contractAddressObject.contractAddress;
  }

  private getContractABI(): any {
    const abiFromStorage = localStorage.getItem('contractABI');
    if (!abiFromStorage) {
      throw new Error('Contract ABI not found in localStorage');
    }
    return JSON.parse(abiFromStorage);
  }

  public async createInitialCards(): Promise<void> {
    if (!this.privilegeCardContract) {
      throw new Error('Contract is not initialized');
    }

    for (const card of this.getAvailableCards()) {
      try {
        await this.privilegeCardContract.createCard(card.name, card.price, card.discountRate, card.quantity, card.imageUrl, card.description);
        console.log(`${card.name} card created successfully`);
      } catch (error: any) {
        if (error.reason.includes('revert Quantity must be at least 1')) {
          console.error(`Error creating ${card.name} card: Quantity must be at least 1`);
        } else {
          console.error(`Error creating ${card.name} card:`, error);
        }
      }
    }
  }

  public async buyCard(cardId: number, value: string): Promise<void> {
    if (!this.privilegeCardContract) {
      throw new Error('Contract is not initialized');
    }

    try {
      const transactionResponse = await this.privilegeCardContract.connect(this.signer).buyCard(cardId, { value });
      await transactionResponse.wait();
      console.log(`Card with ID ${cardId} bought successfully.`);
    } catch (error: any) {
      console.error(`Error buying card with ID ${cardId}:`, error);
      throw new Error(`Error buying card with ID ${cardId}`);
    }
  }

  public getAvailableCards(): any[] {
    return [
      { id: 1, name: 'Gold', price: ethers.parseEther('0.000000000000000007'), discountRate: 75, quantity: 0, imageUrl: 'https://i.imgur.com/H9ufH3W.png', description: 'Gold Card Description' },
      { id: 2, name: 'Silver', price: ethers.parseEther('0.000000000000000005'), discountRate: 50, quantity: 100, imageUrl: 'https://i.imgur.com/EjLJEfi.png', description: 'Silver Card Description' },
      { id: 3, name: 'Bronze', price: ethers.parseEther('0.000000000000000002'), discountRate: 25, quantity: 100, imageUrl: 'https://i.imgur.com/OLRrRmQ.png', description: 'Bronze Card Description' },
    ];
  }

  public async addAdmin(newAdminAddress: string): Promise<void> {
    this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, await this.web3Service.getETHSigner());
    if (!this.privilegeCardContract) {
      console.error('Contract is not initialized');
      return;
    }

    try {
      const tx = await this.privilegeCardContract.addAdmin(newAdminAddress);
      await tx.wait();
      console.log(`Admin ${newAdminAddress} added successfully.`);
    } catch (error) {
      console.error(`Error adding ${newAdminAddress} as admin:`, error);
      throw error;
    }
  }


  public async getAllAdmins(): Promise<any[]> {
    try {
      this.provider = this.web3Service.getETHProvider();
      this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
      const result = await this.privilegeCardContract.getAllAdmins();
      console.log("ça marche bb" + result)
      return result;
    } catch (error) {
      console.error(`Error when displaying admin addresses:`, error);
      throw error;
    }
  }
}
