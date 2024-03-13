import { Component, OnInit } from '@angular/core';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';
import { PrivilegeCard } from '../models/privilege-card.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privilege-card-list',
  templateUrl: './list-privilege-card.component.html',
  styleUrls: ['./list-privilege-card.component.css']
})
export class PrivilegeCardListComponent implements OnInit {
  cards: PrivilegeCard[] = [];

  constructor(
    private authService: AuthService,
    private listCardsService: ListPrivilegeCardService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
    } else {
      this.loadCards();
      this.listCardsService.createInitialCards();
    }
  }

  async loadCards(): Promise<void> {
    this.cards = this.listCardsService.getAvailableCards();
  }
}
