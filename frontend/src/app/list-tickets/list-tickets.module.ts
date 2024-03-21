import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavBarModule } from '../navbar/navbar.module';
import { ListTicketsComponent } from './list-tickets.component';

@NgModule({
  declarations: [
    ListTicketsComponent
  ],
  imports: [
    NavBarModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    ListTicketsComponent
  ]
})
export class ListTicketsModule { }
