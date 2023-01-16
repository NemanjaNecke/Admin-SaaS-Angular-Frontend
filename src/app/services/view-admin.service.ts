import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ViewAdminService {
  baseUrl = environment.baseUrl;
  adminUrl = environment.apipaths.adminusers
  private admin = environment.registrationpaths.admin
  registered!: boolean;
  errors: any;
  constructor(private http: HttpClient, ) {


    }

  public getData(): Observable<any> {

    return this.http.get<{[key:number]:Admin}>(this.baseUrl + this.adminUrl)
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
  registerAdmin(email: string, password1: string, password2: string, first_name: string, last_name: string){
    return this.http.post(this.baseUrl + this.admin, {email, password1, password2, first_name, last_name })
    .pipe(shareReplay()).pipe(
      map((response) => {
        if(response)
        this.registered = true;
        }
      ), catchError((error) => {

        this.errors.push(Object.entries(error.error).join('\n'))
        return this.errors;
      })
      );
  }

  updateAdmin(id:string, formData:{}){
    return this.http.patch(this.baseUrl+this.adminUrl+ id, formData);
  }
}
