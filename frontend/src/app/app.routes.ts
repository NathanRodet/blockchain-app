import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PrivilegeCardListComponent } from './list-privilege-card/list-privilege-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'privilege-cards',
    children: [
      { path: 'purchase', component: PrivilegeCardListComponent },
      { path: '', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'privilege-cards/purchase', component: PrivilegeCardListComponent },
      { path: '', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
