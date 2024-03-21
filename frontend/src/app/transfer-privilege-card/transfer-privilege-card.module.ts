import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferPrivilegeCardComponent } from './transfer-privilege-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    TransferPrivilegeCardComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class TransferPrivilegeCardModule { }
