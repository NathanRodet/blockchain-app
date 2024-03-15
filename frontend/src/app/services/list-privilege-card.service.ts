import { Injectable } from '@angular/core';
import { ethers, Signer, Provider } from 'ethers';
import { Web3Service } from './web3.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListPrivilegeCardService {
  private contractAddress: string | any;
  private contractABI: any | null;
  private signer: Signer | any;
  private privilegeCardContract: any;
  private provider: Provider | any;

  private cardsSubject = new BehaviorSubject<any[]>([]);
  cards$ = this.cardsSubject.asObservable();

  constructor(private web3Service: Web3Service) {
    Promise.resolve(this.initializeContract());
  }

  public async initializeContract(): Promise<void> {
    this.contractAddress = this.getContractAddress();
    this.contractABI = this.getContractABI();
    this.signer = await this.web3Service.getETHSigner();
    this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
  }

  public getContractAddress(): string | any {
    const contractAddressJson = localStorage.getItem('contractAddress');
    if (!contractAddressJson) {
      throw new Error('Contract address not found in localStorage');
    }
    const contractAddressObject = JSON.parse(contractAddressJson);
    return contractAddressObject.contractAddress;
  }

  public getContractABI(): any {
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

    for (const card of await this.getAvailableCards()) {
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

  public async deleteCard(cardId: number): Promise<void> {
    this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
    if (!this.privilegeCardContract) {
      throw new Error('Contract is not initialized');
    }
  
    try {
      const transactionResponse = await this.privilegeCardContract.deleteCard(cardId);
      await transactionResponse.wait();
      console.log(`Card with ID ${cardId} deleted successfully.`);
      await this.updateAvailableCards();
    } catch (error: any) {
      console.error(`Error deleting card with ID ${cardId}:`, error);
      throw new Error(`Error deleting card with ID ${cardId}`);
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
      await this.updateAvailableCards();
    } catch (error: any) {
      console.error(`Error buying card with ID ${cardId}:`, error);
      throw new Error(`Error buying card with ID ${cardId}`);
    }
  }

  public async getAvailableCards(): Promise<any[]> {
    this.provider = this.web3Service.getETHProvider();
    this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
    const cardsArray = await this.privilegeCardContract.getAvailableCards();

    return cardsArray.map((card: any[]) => ({
      id: Number(card[0]),
      name: card[1],
      price: ethers.formatEther(card[2]),
      discountRate: Number(card[3]),
      quantity: Number(card[4]),
      imageUrl: card[5],
      description: card[6]
    }));
  }

  public async updateAvailableCards(): Promise<void> {
    const cardsArray = await this.getAvailableCards();
    this.cardsSubject.next(cardsArray);
    this.cardsSubject.subscribe(console.log)
  }

  public async getOwnedPrivilegeCards(): Promise<any[]> {
    this.provider = this.web3Service.getETHProvider();
    this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
    return this.privilegeCardContract.getOwnedCards(this.contractAddress);
  }
}
