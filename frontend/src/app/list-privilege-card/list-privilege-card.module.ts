import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegeCardListComponent } from './list-privilege-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavBarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    PrivilegeCardListComponent
  ],
  imports: [
    NavBarModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class ListPrivilegeCardModule { }
