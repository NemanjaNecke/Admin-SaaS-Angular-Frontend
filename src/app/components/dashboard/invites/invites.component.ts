import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private invite: InviteService,
    public adminView: ViewAdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,){}

  ngOnInit(): void {
    this.invite.getData().subscribe((res)=>{
      this.invites = res;
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
      // setTimeout(() => {
      //   this.refreshPage()
      // }, 3500);

    }
      }
   )
  }
  createInvite(data:any) {
    this.invite.create(data).subscribe((_res)=>{
      this.openSnackBar('Invite Created! Refreshing page in a few seconds', 'X')
    })
  }
  delete(id:any){
    this.invite.delete(id).subscribe((res)=>{
      this.openSnackBar('Invite Deleted! Refreshing page in a few seconds', 'X')
    })
  }
}
