import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UIService } from '../../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, FlexLayoutModule, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loadingStateSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService) { }

  submitForm(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnInit(): void {
    this.loadingStateSubscription =
      this.uiService.loadingState
        .subscribe((isLoading => this.isLoading = isLoading));
  }

  ngOnDestroy(): void {
    this.loadingStateSubscription.unsubscribe();
  }
}
