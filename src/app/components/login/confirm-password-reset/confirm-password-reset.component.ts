import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { CustomValidators } from 'src/app/models/password.validator';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit {

  passwordForm!: any;
  uid!: any;
  token!: any;
  constructor(
    private auth: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.passwordForm = new FormGroup(
      {
        'password1': new FormControl('', [Validators.required, this.checkPassword]),
        'password2': new FormControl('', [Validators.required, this.checkPassword])
      },
      [CustomValidators.MatchValidator('password1', 'password2')]
    )
  }

  ngOnInit(): void {
    this.uid = this.activatedRoute.snapshot.paramMap.get('uid')
    this.token = this.activatedRoute.snapshot.paramMap.get('token')
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  onSubmit(formData: FormGroup){
    const uid = this.uid;
    const token = this.token;
    const password1 = formData.value.password1;
    const password2 = formData.value.password2;
    this.auth.resetPasswordConfirm(password1, password2, uid, token).pipe(
      catchError((error) => {
        this.openSnackBar(error[0], 'X')
       return error
      })
    ).subscribe((res:any)=>{
      this.openSnackBar(res.detail, 'X')
      this.router.navigate(['/login'])
    });
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
