import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { LogLevel } from "msal";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphService } from './services/graph.service';


export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

export const protectedResourceMap: [string, string[]][] = [[
  'https://graph.microsoft.com/v1.0/me', 
  ['user.read']
]];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot({
      clientID: '25d67fe8-9411-4b43-9837-80dad6083305',
      authority: "https://login.microsoftonline.com/c3e32f53-cb7f-4809-968d-1cc4ccc785fe/",
      validateAuthority: true,
      redirectUri: "http://localhost:4200/",
      cacheLocation: "localStorage",
      postLogoutRedirectUri: "http://localhost:4200/",
      navigateToLoginRequestUrl: true,
      popUp: false,
      consentScopes: ["user.read"],
      unprotectedResources: ["https://www.microsoft.com/en-us/"],
      protectedResourceMap: protectedResourceMap,
      logger: loggerCallback,
      correlationId: '1234',
      level: LogLevel.Info,
      piiLoggingEnabled: true
    })
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: MsalInterceptor, 
      multi: true 
    },
    GraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
