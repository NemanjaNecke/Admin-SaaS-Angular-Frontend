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

  companies: Company[] = []
  admins: Admin[] = []
  newCompany!: Company;
  constructor(private comp: CompanyService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public adminView: ViewAdminService) {

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnInit() {
    this.comp.getData().subscribe((res) => {
      this.companies = res;
    })
    this.adminView.getData().subscribe((res)=>{
      this.admins = res;
    })
  }
  refreshPage() {
    window.location.reload();
  }
  deactivate(name:any){
    this.comp.deactivateInstance(name).subscribe(data => {
      this.openSnackBar('Deactivated company', 'X')
      
      setTimeout(() => {
        this.refreshPage()
      }, 3000);

    })
  }
  activate(name:any){
    this.comp.activateInstance(name).subscribe(data => {
      this.openSnackBar('Activated company', 'X')
      
      setTimeout(() => {
        this.refreshPage()
      }, 3000);

    })
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
      this.openSnackBar('Company Created! Refreshing page in a few seconds', 'X')
    })
  }
}

