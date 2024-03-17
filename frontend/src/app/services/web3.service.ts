import { Injectable } from '@angular/core';
import { ethers, Signer, Contract, Provider } from 'ethers';
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
        if (window.ethereum) {
            this.provider = new ethers.BrowserProvider(window.ethereum);
        }
    }

    public getETHProvider(): Provider {
        return this.provider;
    }

    public async getETHSigner(): Promise<Signer> {
        return await this.provider.getSigner();
    }

    public async getAccountAddress(): Promise<string> {
        const signer = await this.provider.getSigner();
        return await signer.getAddress();
    }

    public async deployETHContract(contractABI: any[], contractBytecode: string): Promise<string> {
        const signer = await this.getETHSigner();
        const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
        const contract = await contractFactory.deploy();
        return await contract.getAddress();
    }
}
