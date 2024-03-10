import { Injectable, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Router } from '@angular/router';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private provider: any;
  constructor(private router: Router) { }

  public async loginWithMetaMask(): Promise<boolean> {
    if (typeof window.ethereum === 'undefined') {
      console.error("Ethereum wallet is not connected. Please install MetaMask or another Ethereum wallet.");
      return false;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await this.provider.getSigner();
      const address = await signer.getAddress();

      localStorage.setItem('currentUser', JSON.stringify({ address }));
      this.router.navigate(['/']);
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
    this.provider = null;
    this.router.navigate(['/login']);
  }
}
