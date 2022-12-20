import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Admin, Company } from 'src/app/models/user.model';
import { CompanyService } from 'src/app/services/company.service';
import { ViewAdminService } from 'src/app/services/view-admin.service';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  loading = true;
  companies: Company[] = []
  admins: Admin[] = []
  newCompany!: Company;
  active!: boolean
  constructor(private comp: CompanyService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private adminView: ViewAdminService) {

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnInit() {
    this.comp.getData().subscribe((res) => {
      this.companies = res;
      this.loading = false;
    })
    this.adminView.getData().subscribe((res)=>{
      this.admins = res;
    })
  }
  refreshPage() {
    window.location.reload();
  }
  checkActive(id:any){
    return this.active = id;
  }
  deactivate(name:any){
    
    if(this.active){
      this.loading = true;
this.comp.deactivateInstance(name).subscribe(data => {
      this.openSnackBar('Deactivated company', 'X')
      
      this.comp.getData().subscribe((res)=>{
        this.companies = res;
        this.loading = false;
      })
    })
    }else {
      this.openSnackBar('Company alread inactive', 'X')
    }
    
  }
  activate(name:any){
    
    if(!this.active){
      this.loading = true
      console.log(this.active)
      this.comp.activateInstance(name).subscribe(data => {
      this.openSnackBar('Activated company', 'X')
      
      this.comp.getData().subscribe((res)=>{
        this.companies = res;
        this.loading = false;
      })
    })
    }else {
      this.openSnackBar('Company alread active', 'X')
    }
    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: this.admins,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
           this.newCompany = result;
      this.createCompany(this.newCompany);
      // setTimeout(() => {
      //   this.refreshPage()
      // }, 3500);

    }
      }
   )
  }
  createCompany(data:any) {
    this.comp.create(data).subscribe((_res)=>{
      this.openSnackBar('Company Created!', 'X')
      this.loading = true;
      this.comp.getData().subscribe((res)=>{
        this.companies = res
        this.loading = false;
      })
    })
  }
}

