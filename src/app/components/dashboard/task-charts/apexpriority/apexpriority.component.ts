import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions, ChartOptionsPriority } from 'src/app/models/task.model';

@Component({
  selector: 'app-apexpriority',
  templateUrl: './apexpriority.component.html',
  styleUrls: ['./apexpriority.component.css']
})
export class ApexpriorityComponent {
  @ViewChild("chart") chart!: ChartComponent;
  @Input() chartOptionsPriority!: Partial<ChartOptionsPriority> | any;
}
