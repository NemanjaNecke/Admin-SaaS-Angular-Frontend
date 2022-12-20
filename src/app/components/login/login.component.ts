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
        // If the login request is successful, clear the errors and navigate to the home page
        this.errors = [];
        this.router.navigate(['/home/dashboard'], { queryParams: { loggedin: 'success' } });
      },
      error: (err) => {
        // If there is an error, show the errors
        this.errors = this.auth.errors;
        if (this.errors.length > 0) {
          for (const i of this.errors) {
            this.openSnackBar(i.error.non_field_errors, 'X');
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
