import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (await this.authService.hasAddress()) {
      this.router.navigate(['/']);
    }
  }

  async login(): Promise<void> {
    try {
      const success: boolean = await this.authService.loginWithMetaMask();
      if (success) {
        this.notificationService.showSuccessNotification('Successfully authenticated.', 'Success');
      } else {
        this.notificationService.showErrorNotification('Authentication failed. Please ensure you have MetaMask installed and are connected to the correct network.', 'Error');
      }
    } catch (error) {
      this.notificationService.showErrorNotification(`An error occurred during login: ${error}`, 'Error');
    }
  }
}
