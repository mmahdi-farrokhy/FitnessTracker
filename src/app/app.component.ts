import { Component, importProvidersFrom, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './persian-date-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './components/header/header.component';
import { PersmissionService } from './services/permission-service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PersianPaginatorIntl } from './utils/pagination.internationalization';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    SidenavListComponent,
    HeaderComponent,
    AngularFireAuthModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    PersmissionService,
    { provide: MatPaginatorIntl, useClass: PersianPaginatorIntl },
  ]
})
export class AppComponent {

  constructor(private db: AngularFirestore) {
    this.db.collection('excercises').valueChanges().subscribe(data =>
      console.log(data)
    );
  }
}
