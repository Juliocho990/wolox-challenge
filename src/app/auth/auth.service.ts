import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredential } from '../user-credential';
import { Router } from '@angular/router';
import { Token } from '../token';
import { Error } from '../error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL_ROOT = 'https://private-8e8921-woloxfrontendinverview.apiary-mock.com';

  public errors: any = [];

  public isLogged = false;

  public userCredential: UserCredential = {
    email: '',
    password: '',
    keepSession: false
  };


  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token && !this.isLogged) {
      return false;
    }
    return true;
  }

  public login(userCredential: UserCredential) {
    this.http.post(
      this.API_URL_ROOT + '/login',
      JSON.stringify(userCredential)
    ).subscribe (
      (data: Token) => {
        if (userCredential.keepSession) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', userCredential.email);
        } else {
          this.isLogged = true;
          this.userCredential = userCredential;
        }
        this.router.navigate(['list']);
      },
      (err: Error) => {
        this.errors = err.error;
      }
    );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isLogged = false;
    this.router.navigate(['home']);
  }

}
