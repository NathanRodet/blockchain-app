import { Component, OnInit } from '@angular/core';
import { ListTicketsService } from './list-tickets.service';


@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent implements OnInit {

  constructor(
    private listTicketService: ListTicketsService,
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
