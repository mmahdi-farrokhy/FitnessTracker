import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UIService } from '../../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FlexLayoutModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loadingStateSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingStateSubscription =
      this.uiService.loadingState
        .subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnDestroy(): void {
    this.loadingStateSubscription.unsubscribe();
  }
  
  submitForm(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
