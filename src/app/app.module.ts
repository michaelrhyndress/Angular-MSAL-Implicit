import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { LogLevel } from "msal";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphService } from './core/services/graph.service';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { GetStartedSectionComponent } from './pages/homepage/get-started-section/get-started-section.component';
import { DesignDevelopSectionComponent } from './pages/homepage/design-develop-section/design-develop-section.component';
import { SpeedOfBusinessSectionComponent } from './pages/homepage/speed-of-business-section/speed-of-business-section.component';


export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);

}

export const protectedResourceMap: [string, string[]][] = [[
  'https://graph.microsoft.com/v1.0/me', 
  ['user.read']
]];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GetStartedSectionComponent,
    DesignDevelopSectionComponent,
    SpeedOfBusinessSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot({
      clientID: 'cc37e8ed-6061-4ac6-a149-9ba4e0f6e46e',
      authority: "https://login.microsoftonline.com/800ae9e0-3603-4498-a242-cb7187447855/",
      validateAuthority: true,
      redirectUri: "http://localhost:4200/",
      cacheLocation: "localStorage",
      postLogoutRedirectUri: "http://localhost:4200/",
      navigateToLoginRequestUrl: true,
      popUp: false,
      consentScopes: ["user.read"],
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
