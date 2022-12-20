import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css']
})
export class CreateadminComponent {
  first_name!: string;
  last_name!: string;
  email!: string;
  pass1!: string;
  pass2!: string;
  constructor(
    public dialogRef: MatDialogRef<CreateadminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onCreate(){
    this.dialogRef.close({ first_name: this.first_name, 
      last_name: this.first_name, 
      email: this.email, pass1: this.pass1, pass2: this.pass2 });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
