import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  async login(addressETH: string): Promise<void> {
    try {
      const success = await this.authService.login(addressETH);
      if (!success && addressETH.trim() !== '') {
        this.showErrorNotification('Invalid Ethereum address');
      }
    } catch (error) {
      this.showErrorNotification(`An error occurred during login: ${error}`);
    }
  }

  showErrorNotification(message: string): void {
    this.toastrService.error(message, 'Error');
  }
}
