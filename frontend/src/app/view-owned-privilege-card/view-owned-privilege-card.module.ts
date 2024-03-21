import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOwnedPrivilegeCardComponent } from './view-owned-privilege-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditPrivilegeCardModule } from '../edit-privilege-card/edit-privilege-card.module';
import { NavBarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    ViewOwnedPrivilegeCardComponent
  ],
  imports: [
    CommonModule,
    EditPrivilegeCardModule,
    NavBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
})
export class ViewOwnedPrivilegeCardModule { }
