import { Component } from '@angular/core';
import { MsalService, BroadcastService } from "@azure/msal-angular";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GraphService } from './core/services/graph.service';
import { AuthenticationService } from './core/services/authentication.service';
import { observable } from 'rxjs';

// import { getTNode } from '@angular/core/src/render3/util';
// import { getToken } from '@angular/router/src/utils/preactivation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: MsalService["user"] = null;
  public userInfo: Object = null;
  public loggedIn: boolean = false;

  constructor(
    private broadcastService: BroadcastService, 
    private authService: AuthenticationService,
    private graphService: GraphService
  ) {
    if (this.authService.getUser()) {
      this.user = this.authService.getUser();
      this.loggedIn = true;
    } else {
      this.authService.login() //login on page load
    }
  }

  // ngOnInit() {
  //   // this.broadcastService.subscribe("msal:loginFailure", (payload) => {
  //   //   console.log("login failure " + JSON.stringify(payload));
  //   //   this.loggedIn = false;
  //   // });

  //   // this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
  //   //   console.log("login success " + JSON.stringify(payload));
  //   //   this.loggedIn = true;
  //   // });
  // }

  // ngOnDestroy() {
  //   // this.broadcastService.getMSALSubject().next(1);
  // }

  // login() {
  //   this.authService.loginRedirect(["user.read"]);
  // }

  // logout() {
  //   this.authService.logout();
  // }

  // async getToken(scope: string[] = ['.default']) {
  //   let token = await this.authService.acquireTokenSilent(scope).then(token => token);
  //   if (!token) {
  //     this.login();
  //   }
  //   return token;
  // }

  async getUserInfo(apiVersion) {
    
    // this.authService.getUserInfo(apiVersion)
    // .subscribe(data => {
    //   this.userInfo = data;
    // }, error => {
    //   console.error("Http get request to MS Graph 'me' endpoint failed: " + JSON.stringify(error));
    // });
    console.log("getUserInfo");
    await this.authService.getUserInfo(apiVersion).then(observable => {
      observable.subscribe(data => {
        this.userInfo = data;
      }, error => {
        console.error("Http get request to MS Graph 'me' endpoint failed: " + JSON.stringify(error));
      });
    });
  }
}
