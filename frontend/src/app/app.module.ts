import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'; 
import { AuthModule } from './auth/auth.module';
import { ListPrivilegeCardModule } from './list-privilege-card/list-privilege-card.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavBarModule } from './navbar/navbar.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EditPrivilegeCardModule } from './edit-privilege-card/edit-privilege-card.module';
import { ViewOwnedPrivilegeCardModule } from './view-owned-privilege-card/view-owned-privilege-card.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransferPrivilegeCardComponent } from './transfer-privilege-card/transfer-privilege-card.component';
import { TransferPrivilegeCardModule } from './transfer-privilege-card/transfer-privilege-card.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    LandingPageComponent,
    NavBarModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    AuthModule,
    ListPrivilegeCardModule,
    EditPrivilegeCardModule,
    ViewOwnedPrivilegeCardModule,
    TransferPrivilegeCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
