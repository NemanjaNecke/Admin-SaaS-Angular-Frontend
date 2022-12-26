import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/models/password.validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  pass1!: string;
  pass2!: string;
  passwordForm!: any;
  constructor(
    public dialogRef: MatDialogRef<ChangepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.passwordForm = new FormGroup(
      {
        'password1': new FormControl('', [Validators.required, this.checkPassword]),
        'password2': new FormControl('', [Validators.required, this.checkPassword])
      },
      [CustomValidators.MatchValidator('password1', 'password2')]
    )
  }
  onCreate(formData: FormGroup){
    const password1 = formData.value.password1;
    const password2 = formData.value.password2;
    this.dialogRef.close({ pass1: password1, pass2: password2 });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.passwordForm.get('password1')!.hasError('required') ? 'This field is required (The password must be at least 8 characters, one uppercase letter and one number)' :
      this.passwordForm.get('password1')!.hasError('requirements') ? 'Password needs to be at least 8 characters, one uppercase letter and one number' : 
      this.passwordMatchError ?  'Passwords do not match': '';
  }
  get passwordMatchError() {
    return (
      this.passwordForm.getError('mismatch') &&
      this.passwordForm.get('password2')?.touched
    );
  }
  checkValidation(input: string) {
    const validation = this.passwordForm.get(input)!.invalid && (this.passwordForm.get(input)!.dirty || this.passwordForm.get(input)!.touched)
    return validation;
  }
}
