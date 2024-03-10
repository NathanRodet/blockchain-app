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
      window.location.replace('')
      return true;
    } else {
      return false;
    }
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    window.location.replace('/login')
  }
}
