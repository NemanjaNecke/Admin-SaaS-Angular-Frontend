import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/models/password.validator';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fieldRequired: string = "This field is required"
  error: any = []
  uid!: any;
  token!: any;
  constructor(
    private register: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }



  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('uid')
    this.token = this.activatedRoute.snapshot.paramMap.get('token')
    this.createForm();
    this.register.checkURL(this.uid, this.token).subscribe((response) => {
      if (this.register.errors.length > 0) {
        if (this.register.errors[0].status == 404) {
          this.router.navigate(['/not-found'])
        }
        if (this.register.errors[0].status == 405) {
          //console.clear()
        }
      }

    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup(
      {
        'first_name': new FormControl('', [Validators.required]),
        'last_name': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required, Validators.pattern(emailregex)]),
        'password1': new FormControl('', [Validators.required, this.checkPassword]),
        'password2': new FormControl('', [Validators.required, this.checkPassword])
      },
      [CustomValidators.MatchValidator('password1', 'password2')]
    )
  }
  emaiErrors() {
    return this.registerForm.get('email')!.hasError('required') ? 'This field is required' :
      this.registerForm.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' : ''
  }
  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.registerForm.get('password1')!.hasError('required') ? 'This field is required (The password must be at least 8 characters, one uppercase letter and one number)' :
      this.registerForm.get('password1')!.hasError('requirements') ? 'Password needs to be at least 8 characters, one uppercase letter and one number' : 
      this.passwordMatchError ?  'Passwords do not match': '';
  }
  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('password2')?.touched
    );
  }
  checkValidation(input: string) {
    const validation = this.registerForm.get(input)!.invalid && (this.registerForm.get(input)!.dirty || this.registerForm.get(input)!.touched)
    return validation;
  }
  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const params = this.uid + '/' + this.token
    const email = formData.value.email;
    const password1 = formData.value.password1;
    const password2 = formData.value.password2;
    const first_name = formData.value.first_name;
    const last_name = formData.value.last_name;
    this.register.register(email, password1, password2, first_name, last_name, params)
    .subscribe((response)=>{
      if(this.register.errors.length>0){
        this.error = this.register.errors;
      }
      if(this.register.registered){
       this.openSnackBar('Successfully registered! Email with verification link has been sent, please check your inbox', 'X')
        this.router.navigate(['/login'], { queryParams: { registered: 'success' } }); 
    }
  });
     formDirective.resetForm();
    this.registerForm.reset();
  }
}
