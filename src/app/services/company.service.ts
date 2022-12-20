import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.baseUrl;
  companyUrl = environment.apipaths.companies
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
  
    return this.http.get<{[key:number]:Company}>(this.baseUrl + this.companyUrl, { headers: this.headers })
    .pipe(
      map((responseData) => {
        const companies:Company[] = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){ 
            companies.push( {...responseData[key]} ) ;
          }
        }
      return companies;
      }))
  }
  deactivateInstance(name: any) {
    return this.http.put(this.baseUrl + this.companyUrl + name+'/deactivate', {}, { headers:this.headers});
  }
  activateInstance(name:any){
    return this.http.put(this.baseUrl + this.companyUrl + name+'/activate', {}, { headers:this.headers});
  }

  create(data:any){
    return this.http.post<Company>(this.baseUrl+this.companyUrl, data, { headers:this.headers})
  }
}
