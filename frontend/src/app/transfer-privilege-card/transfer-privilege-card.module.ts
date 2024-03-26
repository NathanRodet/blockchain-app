import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferPrivilegeCardComponent } from './transfer-privilege-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NavBarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    TransferPrivilegeCardComponent
  ],
  imports: [
    CommonModule,
    NavBarModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class TransferPrivilegeCardModule { }
