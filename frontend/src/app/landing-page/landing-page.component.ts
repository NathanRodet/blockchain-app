import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NavBarModule } from '../navbar/navbar.module';
import { ListPrivilegeCardModule } from '../list-privilege-card/list-privilege-card.module';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  standalone: true,
  imports: [
    NavBarModule,
    // SlickCarouselModule,
    ListPrivilegeCardModule
  ],
})
export class LandingPageComponent {
  slides = [
    {img: "https://www.emtracsystems.com/wp-content/uploads/2021/06/Banner-Red-Passenger-Train-at-Station-580.png"},
  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
  
}
