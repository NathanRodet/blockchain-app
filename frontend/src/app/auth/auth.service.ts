import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  async login(address: string): Promise<boolean> {
    if (ethers.isAddress(address)) {
      localStorage.setItem('currentUser', JSON.stringify({ address: address }));
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
