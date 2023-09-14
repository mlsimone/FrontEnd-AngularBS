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
import { CategoryService } from './category.service';
import { ImageService } from './images.service';

import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import {
  MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent,
  MsalGuardConfiguration, MsalInterceptorConfiguration, ProtectedResourceScopes,
  MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG
} from '@azure/msal-angular';

import { msalConfig, msalGuardConfig, msalInterceptorConfig, protectedResources } from './auth-config';
import { AccountComponent } from './account/account.component';


function MsalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

function MsalGuardConfigFactory(): MsalGuardConfiguration {
  return (msalGuardConfig);
}

// The Interceptor inserts access tokens with a specific scope to the protected resources in the map.
/**
 * MSAL Angular will automatically retrieve tokens for resources
 * added to protectedResourceMap. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
function MsalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return (msalInterceptorConfig);
}

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
    MsalModule  
  ],
  providers: [
    { provide: ItemService },
    { provide: CategoryService },
    { provide: ImageService },
    {
      provide: MSAL_INSTANCE,
      useFactory: MsalInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MsalGuardConfigFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MsalInterceptorConfigFactory,
    },
    MsalService, // this gives the AppComponent class access to the MSAL instance for the login(). Services get injected.
    MsalBroadcastService, // need this to check if MSAL is "busy".  Can't setAuthenticationStatus if MSAL is "busy"
    MsalGuard,  // this protects routes, so that users can't access without Authenticating first
  ],

  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
