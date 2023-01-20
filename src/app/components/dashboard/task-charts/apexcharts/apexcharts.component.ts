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
export class ApexchartsComponent {
  @ViewChild("chart") chart!: ChartComponent;
  @Input() chartOptions!: Partial<ChartOptions> | any;

}
