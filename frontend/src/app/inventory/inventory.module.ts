import { NgModule } from '@angular/core';
import { NavBarModule } from '../navbar/navbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditPrivilegeCardModule } from '../edit-privilege-card/edit-privilege-card.module';
import { InventoryComponent } from './inventory.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    NavBarModule,
    CommonModule,
    EditPrivilegeCardModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class InventoryModule { }
