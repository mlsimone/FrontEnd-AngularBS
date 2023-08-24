import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddItemPageComponent } from './add-item-page/add-item-page.component';
import { ShowAllPageComponent } from './show-all-page/show-all-page.component';
import { HttpClientModule } from '@angular/common/http';
import { GetItemDetailPageComponent } from './get-item-detail-page/get-item-detail-page.component';

import { ItemService } from './item.service';
import { FilehandlerService } from './filehandler.service';
import { CategoryService } from './category.service';
import { ImageService } from './images.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddItemPageComponent,
    ShowAllPageComponent,
    GetItemDetailPageComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: ItemService },
    { provide: FilehandlerService },
    { provide: CategoryService },
    { provide: ImageService }],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
