import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, debounce } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { Component } from '@angular/core';
import { MsalService, BroadcastService } from "@azure/msal-angular";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GraphService } from './graph.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    public user: MsalService["user"] = null;

    constructor(
      private broadcastService: BroadcastService, 
      private authService: MsalService,
      private graphService: GraphService
    ) {
      if (this.authService.getUser()) {
        this.user = this.authService.getUser();
      } else {
        this.login() //login on page load
      }
    }

    // ngOnInit() {
    //   this.broadcastService.subscribe("msal:loginFailure", (payload) => {
    //     console.log("login failure " + JSON.stringify(payload));
    //     this.loggedIn = false;
    //   });
  
    //   this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
    //     console.log("login success " + JSON.stringify(payload));
    //     this.loggedIn = true;
    //   });
    // }
  
    // ngOnDestroy() {
    //   this.broadcastService.getMSALSubject().next(1);
    // }
  
    login() {
      this.authService.loginRedirect(["user.read"]);
    }
  
    logout() {
      this.authService.logout();
    }
  
    async getToken(scope: string[] = ['.default']) {
      let token = await this.authService.acquireTokenSilent(scope).then(token => token).catch(error => {
        console.error(error)
      });
      if (!token) {
        this.login();
      }
      return token;
    }
  
    async getUserInfo(apiVersion: string = 'v1.0') {
      let token: string = await this.getToken(["user.read"])
      return this.graphService.me(token, apiVersion)
        // .subscribe(data => {
        //   this.userInfo = data;
        // }, error => {
        //   console.error("Http get request to MS Graph 'me' endpoint failed: " + JSON.stringify(error));
        // });
      
      // return observableOf(this.userInfo;
    }

    // getUserRole(): Observable<any> {
    //     const savedCredentials =  this.getUser();
    //     return observableOf(savedCredentials['role']);
    // }

    // getUserType() {
    //     const savedCredentials =  this.getUser();
    //     if ( this.isLogin() ) {
    //         return savedCredentials['role'];
    //     } else {
    //         return false;
    //     }
    // }

    public getUser() {
        return this.authService.getUser();
    }

}
