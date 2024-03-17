import { Injectable } from '@angular/core';
import { ethers, Signer, Provider } from 'ethers';
import { Web3Service } from './web3.service';
import { ListPrivilegeCardService } from './list-privilege-card.service';

@Injectable({
    providedIn: 'root',
})
export class AdminPrivilegeCardService {
    private contractAddress: string | any;
    private contractABI: any | null;
    private provider: Provider | any;
    private privilegeCardContract: any;

    constructor(
        private listPrivilegeCardService: ListPrivilegeCardService,
        private web3Service: Web3Service
    ) {
        this.provider = this.web3Service.getETHProvider();
        this.contractAddress = this.listPrivilegeCardService.getContractAddress();
        this.contractABI = this.listPrivilegeCardService.getContractABI();
    }

    public async addAdmin(newAdminAddress: string): Promise<void> {
        this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, await this.web3Service.getETHSigner());
        if (!this.privilegeCardContract) {
            console.error('Contract is not initialized');
            return;
        }

        try {
            const transactionResponse = await this.privilegeCardContract.addAdmin(newAdminAddress);
            await transactionResponse.wait();
            console.log(`Admin ${newAdminAddress} added successfully.`);
        } catch (error) {
            console.error(`Error adding ${newAdminAddress} as admin:`, error);
            throw error;
        }
    }

    public async isAdmin(): Promise<boolean> {
        try {
            this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
            const userAddress = localStorage.getItem('userAddress')
            return await this.privilegeCardContract.isAdmin(userAddress);
        } catch (error) {
            console.error(`Error when displaying admin addresses:`, error);
            throw error;
        }
    }

    public async createCard(card: any): Promise<void> {
        try {
            this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, await this.web3Service.getETHSigner());
            if (!this.privilegeCardContract) {
                throw new Error('Contract is not initialized');
            }
            const transactionResponse = await this.privilegeCardContract.createCard(card.name, card.price, card.discountRate, card.quantity, card.imageUrl, card.description);
            await transactionResponse.wait();
            console.log(`${card.name} card created successfully`);
        } catch (error: any) {
            console.error(`Error creating ${card.name} card:`, error);
        }
    }

    public async deleteCard(cardId: number): Promise<void> {
        this.privilegeCardContract = new ethers.Contract(this.contractAddress, this.contractABI, await this.web3Service.getETHSigner());
        if (!this.privilegeCardContract) {
            throw new Error('Contract is not initialized');
        }

        try {
            const transactionResponse = await this.privilegeCardContract.deleteCard(cardId);
            await transactionResponse.wait();
            console.log(`Card with ID ${cardId} deleted successfully.`);
            await this.listPrivilegeCardService.updateAvailableCards();
        } catch (error: any) {
            console.error(`Error deleting card with ID ${cardId}:`, error);
            throw new Error(`Error deleting card with ID ${cardId}`);
        }
    }
}
