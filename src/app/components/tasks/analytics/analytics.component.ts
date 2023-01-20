import { Component, OnInit } from '@angular/core';
import { AnalyticsInt } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-analytics-overview',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsOverviewComponent implements OnInit {
  analytics!: AnalyticsInt;
  constructor(private task: TaskService){
    this.task.getAnalytics().subscribe((res)=>{
      this.analytics = res;
    })
  }
  ngOnInit(): void {
    this.task.getAnalytics().subscribe((res)=>{
      this.analytics = res;
    })
  }

}
