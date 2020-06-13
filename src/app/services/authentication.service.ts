import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;

  constructor(
    private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFireStorage, private router: Router) { 
      this.angularFireAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }

  async signIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.router.navigate(['home']);
    }).catch(err => {
      window.alert(err.message);
    });
  }

  async signUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.router.navigate(['home']);
    }).catch(err => {
      window.alert(err.message);
    });
  }

  async signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
}
