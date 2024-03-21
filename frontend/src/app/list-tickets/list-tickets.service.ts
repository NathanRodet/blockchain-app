import { Injectable } from '@angular/core';
import { Web3Service } from '../services/web3.service';
import { ethers, Signer, Provider, BigNumberish } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../models/tickets.model';
@Injectable({
  providedIn: 'root'
})
export class ListTicketsService {
  private ticketFactoryContractAddresses: string | any;
  private ticketFactoryContractABI: any | null;
  private signer: Signer | any;
  private ticketFactoryContract: any;
  private provider: Provider | any;

  constructor(private web3Service: Web3Service) {
    Promise.resolve(this.initializeContract());
  }

  private availableTicketsSubject = new BehaviorSubject<any[]>([]);
  availableTickets$ = this.availableTicketsSubject.asObservable();

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

  // public async getOwnedTickets(): Promise<void> {
  //   this.provider = this.web3Service.getETHProvider();
  //   this.ticketFactoryContract = new ethers.Contract(this.ticketFactoryContract, this.ticketFactoryContractABI, this.signer);

  //   if (!this.ticketFactoryContract) {
  //     throw new Error('Contract is not initialized');
  //   }

  //   try {
  //     const ownedTickets: Ticket[] = await this.ticketFactoryContract.getOwnedTickets();
  //     this.ownedTicketsSubject.next(ownedTickets);
  //   } catch (error) {
  //     console.error('Error getting owned tickets', error);
  //   }
  // }


  public async buyTicket(ticketType: string, transactionValue: ethers.BigNumberish): Promise<void> {
    this.provider = this.web3Service.getETHProvider();
    this.ticketFactoryContract = new ethers.Contract(this.ticketFactoryContract, this.ticketFactoryContractABI, this.signer);

    if (!this.ticketFactoryContract) {
      throw new Error('Contract is not initialized');
    }

    try {
      await this.ticketFactoryContract.connect(this.signer).buyTicket(ticketType, { value: transactionValue });
    } catch (error) {
      console.error('Error buying ticket', error);
    }
  }

  public async getAvailableTickets(): Promise<void> {
    this.provider = this.web3Service.getETHProvider();
    this.ticketFactoryContract = new ethers.Contract(this.ticketFactoryContractAddresses, this.ticketFactoryContractABI, this.provider);

    if (!this.ticketFactoryContract) {
      throw new Error('Contract is not initialized');
    }

    try {
      const availableTickets: Ticket[] = await this.ticketFactoryContract.getAvailableTickets();

      // Add discountedPrice property to each ticket
      const ticketsWithDiscountedPrice = await Promise.all(availableTickets.map(async (ticket: Ticket) => {
        ticket = {
          ticketType: ticket.ticketType,
          defaultPrice: ticket.defaultPrice,
          imageUrl: ticket.imageUrl,
          description: ticket.description
        }

        const discountedPrice = await this.ticketFactoryContract.calculateTicketPrice(ticket.ticketType);

        return {
          ...ticket,
          defaultPrice: ethers.formatEther(ticket.defaultPrice),
          discountedPrice: ethers.formatEther(discountedPrice),
        };

      }));
      this.availableTicketsSubject.next(ticketsWithDiscountedPrice);
    } catch (error) {
      console.error('Error updating available tickets', error);
    }
  }
}
