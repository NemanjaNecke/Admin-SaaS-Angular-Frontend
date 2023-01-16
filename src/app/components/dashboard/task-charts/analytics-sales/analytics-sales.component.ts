import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-analytics-sales',
  templateUrl: './analytics-sales.component.html',
  styleUrls: ['./analytics-sales.component.css']
})
export class AnalyticsSalesComponent implements OnInit {
  @Input() loading = false;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  chartDataLabels: string[] = [];
  chartDataCount: number[] = [];
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    scales: {
      x: {},
      y: {
        min: 100
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [DataLabelsPlugin];

  @Input() barChartData!: ChartData<'bar'>;

  constructor() { }
  ngOnInit(): void {
    
  }
}
