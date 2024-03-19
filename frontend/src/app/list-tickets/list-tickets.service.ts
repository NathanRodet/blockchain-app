import { Injectable } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import { ethers, Signer, Provider } from 'ethers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListTicketsService {

  private userAddress: string | any;
  private ticketFactoryContractAddresses: string | any;
  private ticketFactoryContractABI: any | null;
  private signer: Signer | any;
  private ticketFactoryContract: any;
  private provider: Provider | any;

  private cardsSubject = new BehaviorSubject<any[]>([]);
  cards$ = this.cardsSubject.asObservable();

  constructor(private web3Service: Web3Service) {
    Promise.resolve(this.initializeContract());
  }

  public async initializeContract(): Promise<void> {
    this.ticketFactoryContractAddresses = this.getContractAddress();
    this.ticketFactoryContractABI = this.getContractABI();
    this.signer = await this.web3Service.getETHSigner();
    this.ticketFactoryContract = new ethers.Contract(this.ticketFactoryContractAddresses, this.ticketFactoryContractABI, this.signer);
  }

  public getContractAddress(): string | null {
    const contractAddressJson = localStorage.getItem('ticketFactoryContractAddresses');
    if (!contractAddressJson) {
      console.error('Contract address not found in localStorage');
      return null;
    }
    const contractAddressObject = JSON.parse(contractAddressJson);
    return contractAddressObject.privilegeCardAddress;
  }

  public getContractABI(): any | null {
    const abiFromStorage = localStorage.getItem('ticketFactoryContractABI');
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

}
