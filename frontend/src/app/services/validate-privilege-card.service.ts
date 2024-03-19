import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PrivilegeCardValidatorService {
    constructor() { }

    public validateImageUrl(cardContent: string): boolean {
        const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        return urlPattern.test(cardContent);
    }

    public validateNumber(cardContent: string, isInteger: boolean = false): boolean {
        return isInteger ? Number.isInteger(Number(cardContent)) : !isNaN(Number(cardContent));
    }

    public validateDiscountRate(cardContent: string): boolean {
        const whiteListDiscountRates = [25, 50, 75];
        return whiteListDiscountRates.includes(Number(cardContent));
    }
}
