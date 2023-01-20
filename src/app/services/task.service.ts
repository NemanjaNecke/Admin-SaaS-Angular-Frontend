import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalyticsInt, NotificationCount, Task, TaskResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.baseUrl;
  taskUrl = environment.apipaths.task;
  analytics = environment.apipaths.analytcis;
  notifCount = environment.apipaths.notifCount;
  constructor(private http: HttpClient, 
) {
    }

  public getData( filterValue?: string): Observable<any> {

    return this.http.get<TaskResponse>(this.baseUrl + this.taskUrl+`?ordering=${filterValue}`)
    .pipe(
      map((responseData) => {
 
      return responseData;
      }))
  }

  filterData(filters: { [key: string]: string }): Observable<any> {
    let params = new HttpParams();
    for (const filter in filters) {
      if (filters[filter]) {
        params = params.append(filter, filters[filter]);
      }
    }
    return this.http.get<TaskResponse>(this.baseUrl + this.taskUrl, { params: params })
    .pipe(
      map((responseData) => {
        return responseData;
      }))
}

  public getAnalytics(){
    return this.http.get<AnalyticsInt>(this.baseUrl + this.analytics);
  }

  create(data:any){
    return this.http.post<Task>(this.baseUrl+this.taskUrl, data);
  }

  public updateTask(id: any, formData:{}){
   return this.http.patch<Task>(this.baseUrl+this.taskUrl+id+'/', formData);
  }

  getNotificationCount(){
    return this.http.get<NotificationCount>(this.baseUrl+this.notifCount);
  }
}
