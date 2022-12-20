import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shareReplay, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = environment.baseUrl;
  private registrationUrl = environment.registrationpaths.registration;
  
  public errors: any = []; 
  name: string = ''
  registered: boolean = false;

  constructor(private http: HttpClient, 
    private login: LoginService,
    private handler: HttpBackend,
    ) {
      this.http = new HttpClient(handler);
     }
     
  checkURL(uid:any, token:any){

   return this.http.get(this.baseUrl + this.registrationUrl+uid+'/'+token)
   .pipe(
    catchError((error) => {

    this.errors.push(error)
    return this.errors;
  }))
  }   

  register(email: string, password1: string, password2: string, first_name: string, last_name: string,  params: string){
    return this.http.post(this.baseUrl + this.registrationUrl + params, {email, password1, password2, first_name, last_name })
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
  registerAdmin(email: string, password1: string, password2: string, first_name: string, last_name: string,  params: string){
    return this.http.post(this.baseUrl + this.registrationUrl + params, {email, password1, password2, first_name, last_name })
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
}
