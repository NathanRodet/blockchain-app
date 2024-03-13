import { Component, OnInit } from '@angular/core';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';
import { PrivilegeCard } from '../models/privilege-card.model';

@Component({
  selector: 'app-privilege-card-list',
  templateUrl: './list-privilege-card.component.html',
  styleUrls: ['./list-privilege-card.component.css']
})
export class PrivilegeCardListComponent implements OnInit {
  cards: PrivilegeCard[] = [];

  constructor(private listCardsService: ListPrivilegeCardService) {}

  ngOnInit(): void {
    this.loadCards();
    this.listCardsService.createInitialCards();
  }

  async loadCards(): Promise<void> {
    this.cards = this.listCardsService.getAvailableCards();
  }
}
