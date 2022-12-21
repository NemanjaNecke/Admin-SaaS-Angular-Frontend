import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Admin, Company } from 'src/app/models/user.model';
import { ViewAdminService } from 'src/app/services/view-admin.service';
import { Observable } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateadminComponent } from './createadmin/createadmin.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { AdmindetailsComponent } from './admindetails/admindetails.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  adminUser!: Admin[]
  loading = true;
  companies! : Company[];

 constructor(private breakpointObserver: BreakpointObserver, 
    private admin: ViewAdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private comp: CompanyService
    ) {}
  
  
    ngOnInit(){
    this.admin.getData().subscribe((res)=>{
      this.adminUser = res;
      this.loading = false;
    });
    this.comp.getData().subscribe((res) => {
      this.companies = res;
      this.loading = false;
    })
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
          { title: 'Admin Users', cols: 1, rows: 1,  type:'admin' },
          { title: 'Companies', cols: 1, rows: 1,  type:'companies' },
          { title: 'Card 3', cols: 1, rows: 1, type:'string' },
          { title: 'Card 4', cols: 1, rows: 1,type:'string' }
        ];
      }

      return [
        { title: 'Admin Users', cols: 2, rows: 2,  type:'admin' },
        { title: 'Companies', cols: 1, rows: 1,  type:'companies' },
        { title: 'Invites', cols: 1, rows: 2, type:'string' },
        { title: 'Ip address', cols: 1, rows: 1,  type:'string' }
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
          
      this.createAdmin(result.email, result.pass1, result.pass2, result.first_name, result.last_name);
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
 
}
