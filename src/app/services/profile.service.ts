import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.baseUrl
  account = environment.apipaths.account
  refPass = environment.loginpaths.refreshPass
  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    return this.http.get<User>(this.baseUrl+this.account).pipe((response)=>{
      return response
    })
  }

  changepassword(new_password1: string, new_password2: string){
 
      return this.http.post(this.baseUrl + this.refPass, {new_password1, new_password2})
  }
  
}
