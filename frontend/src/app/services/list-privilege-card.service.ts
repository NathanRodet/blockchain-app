import { Injectable } from '@angular/core';
import { ethers, Signer } from 'ethers';
import { Web3Service } from './web3.service';

@Injectable({
  providedIn: 'root',
})
export class ListPrivilegeCardService {
  private contractAddress: string | any;
  private contractABI: any | null;
  private privilegeCardContract: any;

  constructor(private web3Service: Web3Service) {
    this.contractAddress = this.getContractAddress();
    this.contractABI = this.getContractABI();
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
    this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, await this.web3Service.getETHSigner());
    if (!this.privilegeCardContract) {
      throw new Error('Contract is not initialized');
    }

    for (const card of this.getAvailableCards()) {
      try {
        await this.privilegeCardContract.createCard(card.name, card.price, card.discountRate, card.quantity, card.imageUrl, card.description);
        console.log(`${card.name} card created successfully`);
      } catch (error) {
        console.error(`Error creating ${card.name} card:`, error);
      }
    }
  }

  public getAvailableCards(): any[] {
    return [
      { name: 'Gold', price: ethers.parseEther('1'), discountRate: 75, quantity: 100, imageUrl: 'https://i.imgur.com/H9ufH3W.png', description: 'Gold Card Description' },
      { name: 'Silver', price: ethers.parseEther('0.5'), discountRate: 50, quantity: 100, imageUrl: 'https://i.imgur.com/EjLJEfi.png', description: 'Silver Card Description' },
      { name: 'Bronze', price: ethers.parseEther('0.2'), discountRate: 25, quantity: 100, imageUrl: 'https://i.imgur.com/OLRrRmQ.png', description: 'Bronze Card Description' },
    ];
  }
}
