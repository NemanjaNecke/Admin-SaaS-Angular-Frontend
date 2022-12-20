import { Component, Inject, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  name!: string;
  admin!: any;
  date!: Date;
  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onCreate(){
    this.dialogRef.close({ name: this.name, admin: this.admin, date: this.date });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
