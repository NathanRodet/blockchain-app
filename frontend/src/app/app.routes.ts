import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PrivilegeCardListComponent } from './list-privilege-card/list-privilege-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EditPrivilegeCardComponent } from './edit-privilege-card/edit-privilege-card.component';
import { ViewOwnedPrivilegeCardComponent } from './view-owned-privilege-card/view-owned-privilege-card.component';
import { InventoryComponent } from './inventory/inventory.component';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: LandingPageComponent },

  {
    path: 'inventory', component: InventoryComponent,
    children: [
      { path: 'transfer-card/:id', component: EditPrivilegeCardComponent },
    ]
  },
  {
    path: 'privilege-cards',
    children: [
      { path: 'purchase', component: PrivilegeCardListComponent },
      { path: 'my-cards', component: ViewOwnedPrivilegeCardComponent },
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'privilege-cards/add', component: PrivilegeCardListComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
