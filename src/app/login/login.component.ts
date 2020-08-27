import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserCredential } from '../user-credential';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public isSubmitted = false;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      keepSession: [false]
    })
  }

  login() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.get('keepSession').value) {
      if (confirm('¿Deseas conservar los datos de sesión?')) {
        this.auth.login(<UserCredential>this.loginForm.value);
      } 
    } else {
      this.auth.login(<UserCredential>this.loginForm.value);
    }
  }

  get formControls() { return this.loginForm.controls; }

}
