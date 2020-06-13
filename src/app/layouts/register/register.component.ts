import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: any;
  registerGroup: FormGroup;

  formErrors = {
    'email': '',
    'password': '',
    'confirmpass': ''
  };

  validationMessages = {
    'email': {
      'pattern': 'invalid email format',
    },
    'password': {
      'pattern': 'password must including UPPER/lowercase and numbers',
      'minlength': 'password must contain at least 6 characters'
    }
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm();
  }

  registerForm() {
    this.registerGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmpass: [null]
    });

    this.registerGroup.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  registerSubmit() {
    this.register = this.registerGroup.value;
    if (this.register.password == this.register.confirmpass) {
      this.authService.signUp(this.register.email, this.register.password);
    } else {
      window.alert("Password not match");
    }
  }

  onValueChanged(data?: any) {
    if (!this.registerGroup) { return; }
    const form = this.registerGroup;
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
