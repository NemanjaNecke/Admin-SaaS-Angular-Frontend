import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
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
 
  constructor(private http: HttpClient, private handler: HttpBackend,) {
    this.http = new HttpClient(handler)
  }

  public getData(): Observable<any> {

    return this.http.get<{[key:number]:Invites}>(this.baseUrl + this.inviteUrl)
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
  return this.http.post<Invites>(this.baseUrl+this.inviteUrl, data)
}
delete(id:any){
  return this.http.delete(this.baseUrl+this.inviteUrl + id +'/')
}
}