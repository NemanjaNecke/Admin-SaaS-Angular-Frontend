import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  errors: any[] = [];

  constructor(
    private auth: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  form: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.pattern(this.emailregex)]),
    'password': new FormControl('', [Validators.required,]),
  });
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  submit() {
    this.auth.login(this.form.value.email, this.form.value.password).subscribe({
      next: (_val) => {
        this.router.navigate(['/home'], { queryParams: { loggedin: 'success' } })
        this.errors = this.auth.errors;

        if (this.errors.length > 0) {
          for (const i of this.errors) {
            console.log(i)
            this.openSnackBar(i.error.non_field_errors, 'X')
          }

        }
      }
    });
    
  }
  emaiErrors() {
    return this.form.get('email')!.hasError('required') ? 'This field is required' :
      this.form.get('email')!.hasError('pattern') ? 'Not a valid email address' :''
  }

  getErrorPassword() {
    return this.form.get('password')!.hasError('required') ? 'This field is required' : ''
      
  }
  ngOnInit() {

  }

}
