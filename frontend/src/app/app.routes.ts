import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PrivilegeCardListComponent } from './list-privilege-card/list-privilege-card.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'privilege-cards', component: PrivilegeCardListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
