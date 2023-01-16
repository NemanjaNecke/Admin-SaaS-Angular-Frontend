import { Component, Input, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType, ChartConfiguration, ChartData} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  loading = false;
  chartDataLabels: string[] = [];
  chartDataCount: number[]= [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  ngOnInit(): void {
    this.loading = true;
  }
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  @Input() pieChartData!: ChartData<'pie', number[], string | string[]>;
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];


  constructor() { }

}
