import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ViewAdminService {
  baseUrl = environment.baseUrl;
  adminUrl = environment.apipaths.adminusers
token!: any;
headers!: any;
user!: any
  constructor(private http: HttpClient, 
    private loginService: LoginService, 
    private jwtHelper: JwtHelperService) {
 // Get the JWT token from the LoginService
 this.token = this.loginService.getJwtToken();

 // Decode the JWT token to get the user information
 this.user = this.jwtHelper.decodeToken(this.token);

 // Set the authorization header with the JWT token
 this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    }

  public getData(): Observable<any> {

    // Make the HTTP request with the authorization header
  
    return this.http.get<{[key:number]:Admin}>(this.baseUrl + this.adminUrl, { headers: this.headers })
    .pipe(
      map((responseData) => {
        const admins:Admin[] = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){ 
            admins.push( {...responseData[key]} ) ;
          }
        }
      return admins;
      }))
  }
}
