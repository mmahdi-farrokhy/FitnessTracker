import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    FormsModule,
    RouterModule,
    SidenavListComponent,
    NgIf],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css'
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter<void>();
  isAuthenticated: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeSidenav() {
    this.sidenavClose.emit();
  }

  logout() {
    this.closeSidenav();
    this.authService.logout();
  }
}
