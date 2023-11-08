/**
 * MLS 11/8/23
 * Authentication using (MSAL) Microsoft Authentication Library is only used
 * when the Angular App is NOT hosted in Azure.  When Hosted in Azure, you used
 * a different endpoint to Authenticate!
 * 
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration, ProtectedResourceScopes } from '@azure/msal-angular';
import { ms_graph_endpoint, protectedResources } from './endpoints'

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: 'cbfd5066-67c7-4acb-b058-a901afd13992', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://login.microsoftonline.com/77937645-4237-487f-9b47-68fa8ccc065e', // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: '/auth', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    //postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
    //navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    //clientCapabilities: ['CP1'] // This lets the resource server know that this client can handle claim challenges.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: true, // set to true for IE 11, (used to be set to isIE), // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: true
    }
  }
}

// MLS I added this to keep my app.module cleaner
export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['user.read'],
  }
}

//let myProtectedResourceMap = new Map<string, Array<string | ProtectedResourceScopes> | null>();
//myProtectedResourceMap.set(ms_graph_endpoint, [{ httpMethod: 'GET', scopes: ['user.read'] }]);
//myProtectedResourceMap.set(protectedResources.APIsimple.endpointItems, [{ httpMethod: 'GET', scopes: [...protectedResources.APIsimple.scopes.read] }]);
//myProtectedResourceMap.set(protectedResources.APIsimple.endpointImages, [{ httpMethod: 'GET', scopes: [...protectedResources.APIsimple.scopes.read] }]);
//myProtectedResourceMap.set(protectedResources.APIsimple.endpointCategories, [{ httpMethod: 'GET', scopes: [...protectedResources.APIsimple.scopes.read] }]);
//myProtectedResourceMap.set(protectedResources.APIsimple.endpointItems, [{ httpMethod: 'POST', scopes: [...protectedResources.APIsimple.scopes.write] }]);

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map<string, Array<string | ProtectedResourceScopes> | null>(
    [
      [ms_graph_endpoint, [{ httpMethod: 'GET', scopes: ['user.read'] }]],
      [protectedResources.APIsimple.endpointItems, [{ httpMethod: 'GET', scopes: [...protectedResources.APIsimple.scopes.read] },
      { httpMethod: 'POST', scopes: [...protectedResources.APIsimple.scopes.write] }]],
      [protectedResources.APIsimple.endpointCategories, [{ httpMethod: 'GET', scopes: [...protectedResources.APIsimple.scopes.read] }]],
      [protectedResources.APIsimple.endpointImages, [{ httpMethod: 'GET', scopes: [...protectedResources.APIsimple.scopes.read] },
      { httpMethod: 'POST', scopes: [...protectedResources.APIsimple.scopes.write] }]],
      // MLS 9/14/23 This one line resulting in my getting 401 (Unauthorized) from this endpoint@!!
      //[protectedResources.APIsimple.endpointItems, [{ httpMethod: 'POST', scopes: [...protectedResources.APIsimple.scopes.write] }]]
      //
      // When you have the same endpoint but different scopes/methods, you need to use an Array<ProtectedResourceScopes>,
      // not put the same endpoint in the list 2 times

    ]
  )
}

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
export const silentRequest = {
  scopes: ["openid", "profile"],
  loginHint: "example@domain.net"
};
