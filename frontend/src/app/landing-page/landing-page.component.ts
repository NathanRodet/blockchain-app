import { Component } from '@angular/core';
import { NavBarModule } from '../navbar/navbar.module';
import { ListTicketsModule } from "../list-tickets/list-tickets.module";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  standalone: true,
  imports: [
    NavBarModule,
    ListTicketsModule
  ]
})
export class LandingPageComponent {
}
