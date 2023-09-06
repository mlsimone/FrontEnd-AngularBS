import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowAllPageComponent } from './show-all-page/show-all-page.component';
import { AddItemPageComponent } from './add-item-page/add-item-page.component';
import { GetItemDetailPageComponent } from './get-item-detail-page/get-item-detail-page.component';
import { AccountComponent } from './account/account.component';

import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';


const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'showAll', component: ShowAllPageComponent, canActivate: [MsalGuard] },
  { path: 'addItem', component: AddItemPageComponent, canActivate: [MsalGuard] },
  { path: 'showItem/:id', component: GetItemDetailPageComponent, canActivate: [MsalGuard] },
  { path: 'profile', component: AccountComponent, canActivate: [MsalGuard] },
  { path: 'auth', component: MsalRedirectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
