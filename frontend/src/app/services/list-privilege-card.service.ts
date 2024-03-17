import { Injectable } from '@angular/core';
import { ethers, Signer, Provider } from 'ethers';
import { Web3Service } from './web3.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListPrivilegeCardService {
  private userAddress: string | any;
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

  public getContractAddress(): string | null {
    const contractAddressJson = localStorage.getItem('contractAddresses');
    if (!contractAddressJson) {
      console.error('Contract address not found in localStorage');
      return null;
    }
    const contractAddressObject = JSON.parse(contractAddressJson);
    return contractAddressObject.privilegeCardAddress;
  }

  public getContractABI(): any | null {
    const abiFromStorage = localStorage.getItem('contractABI');
    if (!abiFromStorage) {
      console.error('Contract ABI not found in localStorage');
      return null;
    }
    return JSON.parse(abiFromStorage);
  }

  public getAccountAddress(): string | null {
    const userAddress = localStorage.getItem('userAddress');
    if (!userAddress) {
      console.error('User Address not found in localStorage');
      return null;
    }
    return userAddress;
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

    return cardsArray.map((card: any[]) => {
      const [id, name, price, discountRate, quantity, imageUrl, description] = card;
      return {
        id: Number(id),
        name: name,
        price: ethers.formatEther(price),
        discountRate: Number(discountRate),
        quantity: Number(quantity),
        imageUrl: imageUrl,
        description: description
      }
    });
  }

  public async updateAvailableCards(): Promise<void> {
    const cardsArray = await this.getAvailableCards();
    this.cardsSubject.next(cardsArray);
    this.cardsSubject.subscribe(console.log)
  }

  public async getOwnedPrivilegeCards(): Promise<any[]> {
    return this.privilegeCardContract.getOwnedCards(this.userAddress);
  }
}
