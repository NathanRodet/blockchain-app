import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPrivilegeCardComponent } from './edit-privilege-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditPrivilegeCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    EditPrivilegeCardComponent
  ]
})
export class EditPrivilegeCardModule { }
