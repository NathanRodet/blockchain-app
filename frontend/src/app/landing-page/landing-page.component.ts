import { Component } from '@angular/core';
import { NavBarModule } from '../navbar/navbar.module';
import { ListPrivilegeCardModule } from '../list-privilege-card/list-privilege-card.module';
import { ListTicketsModule } from "../list-tickets/list-tickets.module";
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  standalone: true,
  imports: [
    NavBarModule,
    SlickCarouselModule,
    ListPrivilegeCardModule,
    ListTicketsModule
  ],
})
export class LandingPageComponent {
  slides = [
    {img: "https://www.emtracsystems.com/wp-content/uploads/2021/06/Banner-Red-Passenger-Train-at-Station-580.png"},
  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
  
}
