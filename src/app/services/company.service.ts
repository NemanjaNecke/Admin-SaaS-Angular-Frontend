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

  constructor(private http: HttpClient, 
) {
    }

  public getData(): Observable<any> {


  
    return this.http.get<{[key:number]:Company}>(this.baseUrl + this.companyUrl)
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
    return this.http.put(this.baseUrl + this.companyUrl + name+'/deactivate', {});
  }
  activateInstance(name:any){
    return this.http.put(this.baseUrl + this.companyUrl + name+'/activate', {});
  }

  create(data:any){
    return this.http.post<Company>(this.baseUrl+this.companyUrl, data)
  }
}
