import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateInviteComponent {
  email!: string;
  admin!: any;

  constructor(
    public dialogRef: MatDialogRef<CreateInviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onCreate(){
    this.dialogRef.close({ email: this.email, invited_by: this.admin });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
