import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NotificationService } from './notification.service';
import { Web3Service } from './web3.service';
import PrivilegeCard from '../../../../artifacts/contracts/PrivilegeCard.sol/PrivilegeCard.json';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private router: Router,
    private web3Service: Web3Service, 
    private notificationService: NotificationService
  ) { }

  public async loginWithMetaMask(): Promise<boolean> {
    if (typeof window.ethereum === 'undefined') {
      this.notificationService.showErrorNotification("Ethereum wallet is not connected. Please install MetaMask or another Ethereum wallet.", "Error");
      return false;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const contractAddress = await this.web3Service.deployETHContract(PrivilegeCard.abi, PrivilegeCard.bytecode);
      if (contractAddress !== null) {
        localStorage.setItem('contractAddress', JSON.stringify({ contractAddress }));
        localStorage.setItem('contractABI', JSON.stringify(PrivilegeCard.abi))
        this.router.navigate(['/']);
      }

      return true;
    } catch (error) {
      console.error('Error connecting with MetaMask', error);
      return false;
    }
  }

  public async isLoggedIn(): Promise<boolean> {
    let connectedAddresses: string[] = [];
  
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && Array.isArray(accounts)) {
          connectedAddresses = accounts;
        }
        if (connectedAddresses.length === 0) this.logout();
      } catch (error) {
        console.error("Error fetching accounts", error);
      }
    }
    return connectedAddresses.length > 0;
  }
  
  public logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  
}
