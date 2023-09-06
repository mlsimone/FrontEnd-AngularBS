import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddItemPageComponent } from './add-item-page/add-item-page.component';
import { ShowAllPageComponent } from './show-all-page/show-all-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GetItemDetailPageComponent } from './get-item-detail-page/get-item-detail-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { ItemService } from './item.service';
import { FilehandlerService } from './filehandler.service';
import { CategoryService } from './category.service';
import { ImageService } from './images.service';

import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent } from '@azure/msal-angular';
import { msalConfig, msalGuardConfig, msalInterceptorConfig } from './auth-config';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddItemPageComponent,
    ShowAllPageComponent,
    GetItemDetailPageComponent,
    NavBarComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      msalGuardConfig, // MSAL Guard Configuration
      msalInterceptorConfig) // MSAL Interceptor Configuration
  ],
  providers: [{ provide: ItemService },
  { provide: FilehandlerService },
  { provide: CategoryService },
  { provide: ImageService },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],

  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
