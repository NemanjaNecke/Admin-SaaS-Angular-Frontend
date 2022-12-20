import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invites } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  baseUrl = environment.baseUrl;
  inviteUrl = environment.apipaths.invites
  token!: any;
  headers!: any;
  user!: any
  constructor(private http: HttpClient, 
    private loginService: LoginService, 
    private jwtHelper: JwtHelperService) {
      this.token = this.loginService.getJwtToken();

this.user = this.jwtHelper.decodeToken(this.token);
this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    }

  public getData(): Observable<any> {

    return this.http.get<{[key:number]:Invites}>(this.baseUrl + this.inviteUrl, { headers: this.headers })
    .pipe(
      map((responseData) => {
        const invites:Invites[] = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){ 
            invites.push( {...responseData[key]} ) ;
          }
        }
      return invites;
      }))
}

create(data:any){
  return this.http.post<Invites>(this.baseUrl+this.inviteUrl, data, { headers:this.headers})
}
delete(id:any){
  return this.http.delete(this.baseUrl+this.inviteUrl + id +'/',  { headers:this.headers})
}
}