import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Admin, Invites } from 'src/app/models/user.model';
import { InviteService } from 'src/app/services/invite.service';
import { ViewAdminService } from 'src/app/services/view-admin.service';
import { CreateInviteComponent } from './create/create.component';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  invites: Invites[] = []
  admins: Admin[] = []
  newInvite!: any;
  loading = true;

  selectedRow!: any;
  selectedRowHeight = '58px';

  constructor(private invite: InviteService,
    public adminView: ViewAdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router){
    }

  ngOnInit(): void {
    this.loading = true;
    this.invite.getData().pipe(
      catchError((error) => {
        // Handle the error
        this.openSnackBar('Welcome user!', 'X')
        this.router.navigate(['/home/profile'])
        // Return an empty array as a fallback
       return error
      })
    ).subscribe((res)=>{
      this.invites = res;
      this.loading = false;
    })
    this.adminView.getData().subscribe((res)=>{
      this.admins = res;
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateInviteComponent, {
      data: this.admins,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
           this.newInvite = result;
      this.createInvite(this.newInvite);
    }
      }
   )
  }
  createInvite(data:any) {
    this.loading = true;
    this.invite.create(data).subscribe( {
        next: (_res) => {
      this.openSnackBar('Invite Created!', 'X')
      this.invite.getData().subscribe((res) => {
        this.invites = res;
        this.loading = false;
      })
    },
    error: (e) => {
      this.openSnackBar(e, 'X')
      this.invite.getData().subscribe((res) => {
        this.invites = res;
        this.loading = false;
      })
    }
    } 
   )
  }
  delete(id:any){
    this.loading = true
    this.invite.delete(id).subscribe((res)=>{
      this.openSnackBar('Invite Deleted!', 'X')
      this.invite.getData().subscribe((res)=>{
        this.invites = res;
        this.loading = false;
      })
    })
  }

}
