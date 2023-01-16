import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpAddress } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IpaddressService {
  baseUrl = environment.baseUrl;
  inviteUrl = environment.apipaths.ipAddress
  token!: any;

  user!: any
  constructor(private http: HttpClient, 
   ) {

    }

  public getData(@Optional() filter: string): Observable<any> {
    return this.http.get<{[key:number]:IpAddress}>(this.baseUrl + this.inviteUrl +
      `?ordering= ${filter}`)
    .pipe(
      map((responseData) => {
        const ips:IpAddress[] = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){ 
            ips.push( {...responseData[key]} ) ;
          }
        }
      return ips;
      }))
}
}
