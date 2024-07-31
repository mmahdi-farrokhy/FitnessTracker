import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavListComponent } from '../sidenav-list/sidenav-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    SidenavListComponent,
    HeaderComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
