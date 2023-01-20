import { ChartData } from "chart.js";

export interface Task {
    "id": string,
	"company": string,
	"created_by": string,
	"description": string,
	"due_date": Date,
	"status": string,
	"value": number,
	"priority": string,
	"currency": string,
	"notification": boolean,
	"notification_date": Date | null,
	"category": string,
	"responsible_user": string
}
interface Result {
	data: Task[];
  }

  export interface NotificationCount {
	count: number
  }
export const STATUS = [
	{viewValue: 'Opened',value:'open' },
 	{viewValue:'Assigned',value:'assigned'},
  	{viewValue:'Pending',value:'pending'},
  	{viewValue:'In Progress',value:'in_progress'},
  	{viewValue:'Completed',value:'completed' },
  	{viewValue:'Closed opened in error',value:'error_open'}
]
export const PRIORITY  = [
	{value: 'low', viewValue: 'Low'},
	{value: 'medium', viewValue: 'Medium'},
	{value: 'high', viewValue: 'High'}
]
export const CATEGORY = [
	{value:'sales', viewValue:'Sales'},
	{value:'marketing', viewValue:'Marketing'},
	{value:'finance', viewValue:'Finance'},
	{value:'tech', viewValue:'Technology'},
	{value:'hr', viewValue:'Human Resources'}
]
export const CURRENCY = [
	{value:'EUR',viewValue: 'EURO'},
	{value:'USD',viewValue: 'American Dolar'},
	{value:'RUB',viewValue: 'Russian ruble'},
	{value:'BAM',viewValue: 'Bosnia and Herzegovina convertible mark'},
	{value:'RSD',viewValue: 'Serbian Dinar'}
]	

export interface AnalyticsInt {
	analytics: {
	total_tasks: number;
	task_per_status: { status: string, count: number }[];
	tasks_value_per_priority: { priority: string, value: number}[];
	total_value: number;
	tasks_per_category: { category: string, count: number }[];
	task_value_per_category: { category: string, value: number }[];
	task_value_per_status: { status: string, value: number }[];
	tasks_per_status_and_category: { status: string, category: string, value: number }[];
	task_count_per_month: {month: string, count: number}[],
	task_per_priority: {priority: string, count: number}[],
	monthdata: Month[]
	}
}
interface Month {
    month: string
    count: number ,
    value:  number,
    average_val:  number 
  
}
export interface TaskResponse {
	count: number;
	next?: any;
	previous?: any;
	results: Result;
}

export function transformAPIResponse(response: AnalyticsInt): { datasets: { data: number[]; label: string; }[], labels: string[] } {

	const tasksPerStatusAndCategory = response.analytics.tasks_per_status_and_category;
  
	const dataByStatus: { [status: string]: { [category: string]: number } } = {};
	for (const task of tasksPerStatusAndCategory) {
	  if (!dataByStatus[task.status]) {
		dataByStatus[task.status] = {};
	  }
	  dataByStatus[task.status][task.category] = task.value;
	}
  	
	const labels = response.analytics.tasks_per_category.map(task => task.category);
  
	const datasets = Object.entries(dataByStatus).map(([status, data]) => ({
	  label: status,
	  data: labels.map(label => data[label] || 0),
	}));
  
	return { datasets, labels };
  }
  export function transformData(data: AnalyticsInt) {
	const chartDataLabels = []
	const chartDataCount = []
	let pieChartData: ChartData<'pie', number[], string | string[]> = {datasets:[], labels:[]}
	const count = data.analytics.task_per_status;
	for (let i in count) {
	  chartDataLabels.push(count[i].status);
	  chartDataCount.push(count[i].count);
	}
	
	return pieChartData = {
	  labels: chartDataLabels,
	  datasets: [{
		data: chartDataCount
	  }]
	};
  }
  import {
	ChartComponent,
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexDataLabels,
	ApexTooltip,
	ApexStroke,
	ApexPlotOptions,
	ApexFill,
	ApexYAxis,
	ApexTitleSubtitle,
	ApexMarkers,
  } from "ng-apexcharts";
  export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	stroke: ApexStroke;
	tooltip: ApexTooltip;
	dataLabels: ApexDataLabels;
  };
  export type ChartOptionsPriority = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	dataLabels: ApexDataLabels;
	plotOptions: ApexPlotOptions;
	yaxis: ApexYAxis;
	xaxis: ApexXAxis;
	fill: ApexFill;
	title: ApexTitleSubtitle;
  };
export function transformApexChartOne(data: AnalyticsInt){
	const status = data.analytics.task_value_per_status
	const category = data.analytics.task_value_per_category
	const seriesDataStatus = [];
	const seriesDataCategory = [];
	const axisCategoryStatus: string[] = [];
	const axisCategoryCategory: string[] = [];
	
	for(let s of status) {
		seriesDataStatus.push(s.value)
		axisCategoryStatus.push(s.status)
		
	}
	for(let c of category) {
		seriesDataCategory.push(c.value)
		axisCategoryCategory.push(c.category)
	}
	
	const axisCategoryComb = axisCategoryStatus
	.map((status, index) => 
	status ? status + ' | ' + (axisCategoryCategory[index] ? axisCategoryCategory[index] : '') : '');
	const chartOptions: ChartOptions = {
	series: [
	  {
		name: "status",
		data: seriesDataStatus
	  },
	  {
		name: "category",
		data: seriesDataCategory
	  }
	],
	chart: {
	  height: 550,
	  type: "area"
	},
	dataLabels: {
	  enabled: false
	},
	stroke: {
	  curve: "smooth"
	},
	xaxis: {
	  type: "category",
	  categories: 
	  axisCategoryComb,
	
	},
	tooltip: {
	  x: {
		format: ""
	  }
	}
  }
  return chartOptions;
}

export function apexChartTwo(data: AnalyticsInt) {

	const value_per_priority = data.analytics.tasks_value_per_priority;
	const total_value = data.analytics.total_value;
	const seriesData: number[] = [];
	const xAxis = []
	for(let p of value_per_priority){
		seriesData.push(p.value)
		xAxis.push(p.priority)
	}
	const chartOptions: ChartOptionsPriority = {
		series: [
		  {
			name: "Priority",
			data: seriesData
		  }
		],
		chart: {
		  height: 280,
		  type: "bar"
		},
		plotOptions: {
		  bar: {
			dataLabels: {
			  position: "top" // top, center, bottom
			}
		  }
		},
		dataLabels: {
		  enabled: true,
		  formatter: function(val: any) {
			let percval = Math.round((val /total_value)*10000)/100
			return percval + "%";
		  },
		  offsetY: -20,
		  style: {
			fontSize: "12px",
			colors: ["#304758"]
		  }
		},
  
		xaxis: {
		  categories: xAxis,
		  position: "center",
		  labels: {
			offsetY: 0
		  },
		  axisBorder: {
			show: false
		  },
		  axisTicks: {
			show: false
		  },
		  crosshairs: {
			fill: {
			  type: "gradient",
			  gradient: {
				colorFrom: "#D8E3F0",
				colorTo: "#BED1E6",
				stops: [0, 100],
				opacityFrom: 0.4,
				opacityTo: 0.5
			  }
			}
		  },
		  tooltip: {
			enabled: true,
			offsetY: -35
		  }
		},
		fill: {
		  type: "gradient",
		  gradient: {
			shade: "light",
			type: "horizontal",
			shadeIntensity: 0.25,
			gradientToColors: undefined,
			inverseColors: true,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [50, 0, 100, 100]
		  }
		},
		yaxis: {
		  axisBorder: {
			show: false
		  },
		  axisTicks: {
			show: false
		  },
		  labels: {
			show: false,
			formatter: function(val: number) {
			  return "Actual value " + val;
			}
		  }
		},
		title: {
		  text: `Percentage value of tasks per priority; Total value ${total_value}`,
		  floating: true,
		  offsetY: 0,
		  align: "center",
		  style: {
			color: "#444"
		  }
		}
	  };
	  return chartOptions;
}



export type ChartOptionsMixed = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis | ApexYAxis[];
	labels: string[];
	stroke: any; // ApexStroke;
	markers: ApexMarkers;
	plotOptions: ApexPlotOptions;
	fill: ApexFill;
	tooltip: ApexTooltip;
};


export function ApexChartThree(data: AnalyticsInt) {
	const chartData = data.analytics.monthdata;

    const chartOptions: ChartOptionsMixed = {
        series: [
            {
                name: "Average",
                type: "column",
                data: chartData.map(d => d.average_val)
            },
            {
                name: "Value",
                type: "area",
                data: chartData.map(d => d.value)
            },
            {
                name: "Count",
                type: "line",
                data: chartData.map(d => d.count)
            }
        ],
        chart: {
          height: 300,
          type: "line",
          stacked: false
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth"
        },
        plotOptions: {
          bar: {
            columnWidth: "50%"
          }
        },
        fill: {
          opacity: [0.85, 0.75, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: chartData.map(d => d.month),
        markers: {
          size: 0
        },
		xaxis: {
		  type: "category"
		},
		yaxis: {
		  title: {
			text: "Count"
		  },
		  min: 0
		},
		tooltip: {
		  shared: true,
		  intersect: false,
		  y: {
			formatter: function(y:number) {
			  if (typeof y !== "undefined") {
				return y.toFixed(0) + " tasks";
			  }
			  return y;
			}
		  }
		}
	  };
   return chartOptions;
  
}

 
 

