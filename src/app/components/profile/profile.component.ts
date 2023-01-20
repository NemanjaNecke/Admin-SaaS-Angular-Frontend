import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { TaskService } from 'src/app/services/task.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: User;
  loading!:boolean;
  notificationCount!: number;
  constructor(private prof: ProfileService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private task: TaskService){

  }

  ngOnInit(): void {
    this.loading = true;
 this.getAccount();
 this.task.getNotificationCount().subscribe((res)=>{
  this.notificationCount = res.count;
 })
  }

getAccount(){
     
    this.prof.getData().subscribe((res)=>{
      this.profile = res;
      this.loading = false
    })
}

openDialog(): void {
  const dialogRef = this.dialog.open(ChangepasswordComponent, {
    data: '',
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result){
        
    this.changePassword(result.pass1, result.pass2);
  }
    }
 )
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action);
}
changePassword(pass1:any, pass2:any) {
  this.loading = true;
  this.prof.changepassword(pass1, pass2).pipe(
    catchError((error) => {
      // Handle the error
      this.openSnackBar(error, 'X')
      this.loading = false;
      // Return an empty array as a fallback
     return error
    })
  ).subscribe((res)=>{
    this.openSnackBar('Password changed', 'X')
    this.loading = false;
  })
  
}

}
