import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Admin, Company, Invites, IpAddress } from 'src/app/models/user.model';
import { ViewAdminService } from 'src/app/services/view-admin.service';
import { merge, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { IpaddressService } from 'src/app/services/ipaddress.service';
import { InviteService } from 'src/app/services/invite.service';
import { IpDataSource } from './ip/datasource';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { ChartData } from 'chart.js';
import { AnalyticsInt, apexChartTwo, ChartOptions, ChartOptionsPriority, TaskResponse, transformApexChartOne, transformAPIResponse, transformData } from 'src/app/models/task.model';
import { TokenRefreshInterceptor } from 'src/app/services/token-refresh.interceptor';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  error: any;
  error2: any;
  error3: any;
  errorCards: any;
  adminUser!: Admin[]
  loading = true;
  companies! : Company[];
  ipaddr!: IpAddress[];
  invites!: Invites[];
  sortedData!: IpAddress[];
  sortedInvite!: Invites[];
  public barChartData!: ChartData<'bar'>;
  chartDataLabels: string[] = [];
  chartDataCount: number[]= [];
  pieChartData!: ChartData<'pie', number[], string | string[]>
  chartOptions!: Partial<ChartOptions>;
  chartOptionsPriority!: Partial<ChartOptionsPriority>
 constructor(private breakpointObserver: BreakpointObserver, 
    private admin: ViewAdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private comp: CompanyService,
    private ips: IpaddressService,
    private invite: InviteService,
    private task: TaskService,
    private router: Router,
    private errorService: ErrorService
    ) {}
 
    ngOnInit(){
      this.loadData();
      
  }


  loadData(){
    this.task.getAnalytics().subscribe((res) => {
      const apiResponse: AnalyticsInt = res;
      const chartData = transformAPIResponse(apiResponse);
      const pieChartData = transformData(res);
      const chartOptions = transformApexChartOne(res)
      const chartPriority = apexChartTwo(res)
      this.barChartData = chartData;
      this.pieChartData = pieChartData;
      this.chartOptions = chartOptions;
      this.chartOptionsPriority = chartPriority;
      this.loading = false;
    })
        this.admin.getData().subscribe({
         next: (res)=>{
      this.adminUser = res;
      this.loading = false;
    },
    error: (err) => {
      this.error = true
      return err
    }
        });
    this.comp.getData().subscribe({
      next: (res) => {
      this.companies = res;
      this.loading = false;
    },
    error: (err) => {
      this.error2 = true
      return this.error2
    }
    }
     )
    this.ips.getData('').subscribe((res)=>{
      this.ipaddr = res;
      this.sortedData = this.ipaddr.slice();
    })
    this.invite.getData().subscribe({
     next: (res)=>{
      this.invites = res;
      this.sortedInvite = this.invites.slice()
      this.loading = false;
      
    },
    error: (err) => {
      console.log(err)
      this.error3 = true
      return this.error3
    }
    })
    this.errorService.getError().subscribe((error) => {
      this.error = error;
      if(this.error){
        this.errorCards = [
          { title: 'Number of tasks per status', cols:1, rows:1, type:'analytics'},
          { title: 'Value of tasks per category', cols:1, rows:1, type:'sales'},
          { title: 'Compare value per status and category', cols:2, rows:2, type:'apexOne'},
          { title: 'Value % per priority', cols:2, rows:1, type:'apexTwo'},
          { title: 'Ip address', cols: 2, rows: 1,  type:'ip' },
        ];
        return this.cards = of(this.errorCards);
      }
      return
    });

  }

  sortData(sort: Sort) {
    const data = this.ipaddr.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'ip_address':
          return compare(a.ip_address, b.ip_address, isAsc);
        case 'verified':
          return compare(a.verified, b.verified, isAsc);
        case 'carbs':
          return compare(a.account, b.account, isAsc);

        default:
          return 0;
      }
    });
  }
  sortInviteData(sort:Sort) {
    const data = this.invites.slice();
    if(!sort.active || sort.direction === 'asc') {
      this.sortedInvite = data;
      return;
    }
    this.sortedInvite = data.sort((a,b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'invited_by':
          return compare(a.invited_by, b.invited_by, isAsc);
        case 'accepted':
          return compare(a.accepted, b.accepted, isAsc);
        case 'used':
          return compare(a.used, b.used, isAsc);
        
        default:
          return 0;
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  cards: Observable<Array<{ title: string; 
    cols: number; rows: number; type:string }>> = 
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Number of tasks per status', cols:1, rows:1, type:'analytics'},
          { title: 'Value of tasks per category and status', cols:1, rows:1, type:'sales'},
          { title: 'Compare value per status and category', cols:1, rows:1, type:'apexOne'},
          { title: 'Admin Users', cols: 1, rows: 1,  type:'admin' },
          { title: 'Companies', cols: 1, rows: 1,  type:'companies' },
          { title: 'Invites', cols: 1, rows: 1, type:'invites' },
          { title: 'Ip address', cols: 1, rows: 1,type:'ip' },
          
        ];
      }
        return [
        { title: 'Number of tasks per status', cols:1, rows:1, type:'analytics'},
        { title: 'Value of tasks per category', cols:1, rows:1, type:'sales'},
        { title: 'Compare value per status and category', cols:2, rows:2, type:'apexOne'},
        { title: 'Value % per priority', cols:2, rows:1, type:'apexTwo'},
        { title: 'Admin Users', cols: 4, rows: 2,  type:'admin' },
        { title: 'Companies', cols: 3, rows: 1,  type:'companies' },
        { title: 'Invites', cols: 2, rows: 1, type:'invites' },
        { title: 'Ip address', cols: 2, rows: 1,  type:'ip' },
      
      ];
    })
  );
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateadminComponent, {
      data: '',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
          
      this.createAdmin(result.email, result.pass1, result.pass2, result.first_name, result.last_name);
    }
      }
   )
  }
  openAdmin(id:any){
    const dialogRef = this.dialog.open(AdmindetailsComponent, {
      data: {admin: id, companies:this.companies},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){

          this.updateAdmin(id.id, result);
    }
      }
   )
  }
  createAdmin(email: string, password1: string, password2: string, first_name: string, last_name: string){
    this.loading = true;
    this.admin.registerAdmin(email, password1, password2,first_name,last_name).subscribe((res)=>{

      this.openSnackBar('Admin created successfully!', 'X');
      this.admin.getData().subscribe((res)=>{
        this.adminUser = res;
        this.loading = false;
      })
    })
  }
  updateAdmin(id:string, form: {}){
    this.loading = true;
    this.admin.updateAdmin(id, form).subscribe({
      next: (res)=>{
      this.openSnackBar('Admin updated successfully!', 'X');
      this.admin.getData().subscribe((res)=>{
        this.adminUser = res;
        this.loading = false;
      })
    },
    error: (err)=> {
      this.openSnackBar(err, 'X');
    }
    }
     )
  }
 
}
export function compare(a: number | string | boolean, b: number | string  | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
