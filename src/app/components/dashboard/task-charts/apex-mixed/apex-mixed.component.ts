import { Component, Input } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptionsMixed } from 'src/app/models/task.model';
@Component({
  selector: 'app-apex-mixed',
  templateUrl: './apex-mixed.component.html',
  styleUrls: ['./apex-mixed.component.css']
})
export class ApexMixedComponent {
  @ViewChild("chart") chart!: ChartComponent;
  @Input() chartOptionsMixed!: Partial<ChartOptionsMixed> | any;

}
