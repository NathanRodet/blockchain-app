import { Injectable } from '@angular/core';
import { ethers, Signer, Contract } from 'ethers';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

@Injectable({
    providedIn: 'root'
})
export class Web3Service {
    private provider: any;

    constructor() { 
        // if (window.ethereum) {
        //     this.provider = new ethers.BrowserProvider(window.ethereum);
        // }
        this.provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
    }

    public async getETHSigner(): Promise<Signer> {
        return await this.provider.getSigner();
    }

    public async getETHAddress(): Promise<string> {
        //const signer = await this.provider.getSigner();
        const accounts = await this.provider.listAccounts();
        return accounts[0].address;
        //return await signer.getAddress();
    }
}
