import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
} from "ng-apexcharts";
import { ChartOptions } from 'src/app/models/task.model';


@Component({
  selector: 'app-apexcharts',
  templateUrl: './apexcharts.component.html',
  styleUrls: ['./apexcharts.component.css']
})
export class ApexchartsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  @Input() chartOptions!: Partial<ChartOptions> | any;
  constructor(){

  }
  ngOnInit(){
    if(this.chartOptions){
      // Now you can render the chart safely
      this.chart.updateOptions(this.chartOptions);
    }
  }
}
