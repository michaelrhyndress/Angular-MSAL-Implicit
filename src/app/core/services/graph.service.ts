import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private readonly graphUrl = 'https://graph.microsoft.com';
  constructor (private http: HttpClient) {}

  public me(token: string, version: string = 'v1.0'): Observable<any> {
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.get<any>(`${this.graphUrl}/${version}/me`, options)
      .map(response => response)
      .catch(response => Observable.throw(response.text()));
  }
}
