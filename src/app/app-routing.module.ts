import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowAllPageComponent } from './show-all-page/show-all-page.component';
import { AddItemPageComponent } from './add-item-page/add-item-page.component';
import { GetItemDetailPageComponent } from './get-item-detail-page/get-item-detail-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'showAll', component: ShowAllPageComponent },
  { path: 'addItem', component: AddItemPageComponent },
  { path: 'showItem/:id', component: GetItemDetailPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
