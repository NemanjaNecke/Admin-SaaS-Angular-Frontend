import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admin } from 'src/app/models/user.model';

@Component({
  selector: 'app-admindetails',
  templateUrl: './admindetails.component.html',
  styleUrls: ['./admindetails.component.css']
})
export class AdmindetailsComponent {
 
  constructor(
    public dialogRef: MatDialogRef<AdmindetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
  } 
  first_name!: string;
  last_name!: string;
  onCreate(){
    this.dialogRef.close({ first_name: this.first_name, 
      last_name: this.first_name, 
       });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
