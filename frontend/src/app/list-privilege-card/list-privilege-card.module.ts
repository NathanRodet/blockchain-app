import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegeCardListComponent } from './list-privilege-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PrivilegeCardListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
})
export class ListPrivilegeCardModule { }
