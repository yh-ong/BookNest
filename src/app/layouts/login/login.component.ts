import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login } from 'src/app/models/authenticate';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;
  loginGroup: FormGroup;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'pattern': 'Invalid Email format',
    }
  };

  constructor(private formBuilder: FormBuilder, private angularFireAuth: AngularFireAuth, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm() {
    this.loginGroup = this.formBuilder.group({
      email: [null, Validators.email],
      password: [null, [Validators.minLength(6)]]
    });

    this.loginGroup.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  loginSubmit() {
    this.login = this.loginGroup.value;
    this.authService.signIn(this.login.email, this.login.password);
  }

  onValueChanged(data?: any) {
    if (!this.loginGroup) { return; }
    const form = this.loginGroup;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
