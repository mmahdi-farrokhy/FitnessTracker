import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthData } from '../models/auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null;
  authChange = new Subject<boolean>();
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private uiService: UIService) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingState.next(false);
        this.successfullAuth();
      })
      .catch(error => {
        this.uiService.loadingState.next(false);
        this.snackBar.open(error.message, undefined, { duration: 3000 });
        this.failfullAuth();
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingState.next(false);
        this.successfullAuth();
      })
      .catch(error => {
        this.uiService.loadingState.next(false);
        this.snackBar.open(error.message, undefined, { duration: 3000 });
        this.failfullAuth();
      });
  }

  logout() {
    this.fireAuth.signOut();
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  successfullAuth() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  failfullAuth() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/signup']);
  }
}
