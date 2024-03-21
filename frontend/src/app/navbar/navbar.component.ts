import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminPrivilegeCardService } from '../services/admin-privilege-card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.authService.hasAddress();
    this.isAdmin = false;

  } 
  logout(): void {
    this.authService.logout();
  }
  
}
