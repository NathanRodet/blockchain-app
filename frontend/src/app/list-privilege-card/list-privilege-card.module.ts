import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegeCardListComponent } from './list-privilege-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PrivilegeCardListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class ListPrivilegeCardModule { }
