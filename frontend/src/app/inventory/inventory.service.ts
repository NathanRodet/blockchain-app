import { Injectable } from '@angular/core';
import { ethers, Signer, Provider } from 'ethers';
import { Web3Service } from '../services/web3.service';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../models/tickets.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private ticketFactoryContractAddresses: string | any;
  private ticketFactoryContractABI: any | null;
  private signer: Signer | any;
  private ticketFactoryContract: any;
  private provider: Provider | any;

  constructor(private web3Service: Web3Service) {
    Promise.resolve(this.initializeContract());
  }

  private ownedTicketsSubject = new BehaviorSubject<any[]>([]);
  ownedTickets$ = this.ownedTicketsSubject.asObservable();

  public async initializeContract(): Promise<void> {
    this.signer = await this.web3Service.getETHSigner();
    this.ticketFactoryContractAddresses = this.getContractAddress();
    this.ticketFactoryContractABI = this.getContractABI();
    this.ticketFactoryContract = new ethers.Contract(this.ticketFactoryContractAddresses, this.ticketFactoryContractABI, this.signer);
  }

  public getContractAddress(): string | null {
    const contractAddressJson = localStorage.getItem('ticketFactoryContractAddresses');
    if (!contractAddressJson) {
      console.error('Contract address not found in localStorage');
      return null;
    }
    const contractAddressObject = JSON.parse(contractAddressJson);
    return contractAddressObject.ticketFactoryAddress;
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

  public async getOwnedTickets(): Promise<void> {
    this.provider = this.web3Service.getETHProvider();
    this.ticketFactoryContract = new ethers.Contract(this.ticketFactoryContract, this.ticketFactoryContractABI, this.signer);

    if (!this.ticketFactoryContract) {
      throw new Error('Contract is not initialized');
    }

    try {
      const ownedTickets: Ticket[] = await this.ticketFactoryContract.getOwnedTickets();
      this.ownedTicketsSubject.next(ownedTickets);
    } catch (error) {
      console.error('Error getting owned tickets', error);
    }
  }

}


