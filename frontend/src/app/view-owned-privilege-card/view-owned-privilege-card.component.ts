import { Component } from '@angular/core';
import { PrivilegeCard } from '../models/privilege-card.model';
import { AuthService } from '../services/auth.service';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-owned-privilege-card',
  templateUrl: './view-owned-privilege-card.component.html',
  styleUrl: './view-owned-privilege-card.component.css'
})

export class ViewOwnedPrivilegeCardComponent {
  cards: PrivilegeCard[] | any[] = [];

  constructor(
    private authService: AuthService,
    private listCardsService: ListPrivilegeCardService,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
    } else {
      this.loadOwnedPrivilegeCards();
    }
  }

  public async loadOwnedPrivilegeCards(): Promise<void> {
    this.cards = await this.listCardsService.getOwnedPrivilegeCards();
  }

}
