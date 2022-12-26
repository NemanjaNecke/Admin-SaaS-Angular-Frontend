import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  constructor(
    public dialogRef: MatDialogRef<ResetpasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
  } 
 emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 form: FormGroup = new FormGroup({
  'email': new FormControl('', [Validators.required, Validators.pattern(this.emailregex)]),
});
emaiErrors() {
  return this.form.get('email')!.hasError('required') ? 'This field is required' :
    this.form.get('email')!.hasError('pattern') ? 'Not a valid email address' : ''
}
 reset(formData: FormGroup): void {
  const email = formData.value.email;
  this.dialogRef.close({ 
    email: email});
}
onNoClick(): void {
  this.dialogRef.close();
}

}
