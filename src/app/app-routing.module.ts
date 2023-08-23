import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SaveBoilerPlateCodeComponent } from './save-boiler-plate-code/save-boiler-plate-code.component';
import { ShowAllPageComponent } from './show-all-page/show-all-page.component';
import { AddItemPageComponent } from './add-item-page/add-item-page.component';
import { GetItemDetailPageComponent } from './get-item-detail-page/get-item-detail-page.component';
import { AddSimpleItemPageComponent } from './add-simple-item-page/add-simple-item-page.component'

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'saved', component: SaveBoilerPlateCodeComponent },
  { path: 'showAll', component: ShowAllPageComponent },
  { path: 'addItem', component: AddItemPageComponent },
  { path: 'addSimpleItem', component: AddSimpleItemPageComponent },
  { path: 'showItem/:id', component: GetItemDetailPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
