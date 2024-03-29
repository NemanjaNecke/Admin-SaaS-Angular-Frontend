import { environment } from './../../environments/environment';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { UserResponse, DecodedToken } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';

import { Router } from '@angular/router';
const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.baseUrl;
  private loginUrl = environment.loginpaths.login;
  private logoutUrl = environment.loginpaths.logout;
  private verToken = environment.loginpaths.verifyToken;
  private refToken = environment.loginpaths.refreshToken;
  private refPass = environment.loginpaths.refreshPass;
  private resetPass = environment.loginpaths.resetPass;
  private resetPassConfirm = environment.loginpaths.resetPassConfirm;
  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT access and refresh token
  public token!: DecodedToken; 
  public refreshToken!: DecodedToken;
  // the token expiration date
  public token_expires!: Date;

  // the username and id of the logged in user
  public username!: string;
  public ID!: string;
  // error messages received from the login attempt
  public errors: any = [];
  constructor(
    private http: HttpClient, private router: Router,
    private handler: HttpBackend,) {

      this.http = new HttpClient(handler)
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.token = JSON.parse(localStorage.getItem('auth_meta')!) || new DecodedToken();
    this.username = localStorage.getItem('username')!
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<UserResponse>(this.baseUrl + this.loginUrl, { email, password })
      .pipe(shareReplay()).pipe(
        map((tokens: UserResponse) => {
          this.updateData(tokens['access_token']);
          this.updateRefreshToken(tokens['refresh_token']);
          this.userID(tokens['user'].pk);
        }
        ), catchError((error) => {
 
          this.errors.push(error)
          return throwError(() => new Error());
        })
      );
  }

  public async updateData(token: any) {
    this.token = await jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.token));
    return token;
  }

  public setUsername(response: any) {
    this.username = response;
    localStorage.setItem('username', response)
  }
  public showUsername(): string {
    return this.username;
  }

  private userID(user: any) {
    this.ID = user;
    localStorage.setItem('userID', user);
  }
  public getUserID() {
    return localStorage.getItem('userID');
  }
  public async updateRefreshToken(token: any) {
    this.refreshToken = await jwt.decodeToken(token);
    localStorage.setItem('refresh_tkn', token)
    localStorage.setItem('refresh_meta', JSON.stringify(this.refreshToken))
  }

  public logout() {

    localStorage.clear()
    this.token = new DecodedToken();

    return this.router.navigate(['/login'], { queryParams: { loggedOut: 'success' } });
  }
  public isAuthenticated(): boolean {

    //moment.isBefore(moment.unix(this.token.exp));
    // luxon.Settings.now() < this.token.exp*1000;
    return !jwt.isTokenExpired(this.getJwtToken())
  }

  public verifyToken() {
    return this.http.post(this.baseUrl + this.verToken, JSON.stringify(this.getJwtToken), this.httpOptions);
  }
  //Refreshes the JWT token, to extend the time the user is logged in
  postRefreshToken() {
    return this.http.post(this.baseUrl + this.refToken, this.getRefreshToken(), this.httpOptions)
  }
  getJwtToken() {
    return localStorage.getItem('auth_tkn') || undefined;
  }
  getRefreshToken() {
    return `{"refresh": "${localStorage.getItem('refresh_tkn')}"}`
  }
resetPasswordEmail(email:any) {
  return this.http.post(this.baseUrl+this.resetPass, {email}).pipe(
    map(
      (response) =>{
        return response;
      }
    ),
    catchError((error) => {
    console.log(error);
    this.errors.push(error)
    return this.errors;
  }))
}
resetPasswordConfirm(new_password1: any, new_password2: any, uid: any, token: any){
  return this.http.post(this.baseUrl+this.resetPassConfirm+uid+'/'+token+'/', {new_password1, new_password2, uid, token}).pipe(
    map(
      (response) =>{
        return response;
      }
    ),
    catchError((error) => {
    console.log(error);
    this.errors.push(error)
    return this.errors;
  }))
}


}
