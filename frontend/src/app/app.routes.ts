import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PrivilegeCardListComponent } from './list-privilege-card/list-privilege-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginGuard } from './guards/loginGuard';
import { AuthGuard } from './guards/authGuard';
import { ViewOwnedPrivilegeCardComponent } from './view-owned-privilege-card/view-owned-privilege-card.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '', component: LandingPageComponent},
  {
    path: 'privilege-cards',
    canActivate: [AuthGuard],
    children: [
      { path: 'purchase', component: PrivilegeCardListComponent },
      { path: '', redirectTo: 'purchase', pathMatch: 'full' },
      { path: 'transfer-card/:id', component: NotFoundComponent },
      { path: 'my-cards', component: ViewOwnedPrivilegeCardComponent },
      { path: '**', component: NotFoundComponent },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'privilege-cards/purchase', component: PrivilegeCardListComponent },
      { path: '', redirectTo: 'privilege-cards/purchase', pathMatch: 'full' },
      { path: 'privilege-cards/add', component: PrivilegeCardListComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
 