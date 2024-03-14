import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminPrivilegeCardService } from '../services/admin-privilege-card.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    constructor(
        private adminCardsService: AdminPrivilegeCardService,
        private router: Router
    ) { }

    async canActivate(
        _next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ): Promise<boolean> {
        const isAdmin = await this.adminCardsService.isAdmin();
        if (!isAdmin) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
