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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
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
