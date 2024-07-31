import { AfterViewInit, Component, OnDestroy, OnInit, Pipe, ViewChild } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { MaterialModule } from '../../material.module';
import { pipe, Subscription } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { PersianDatePipe } from '../../pipes/persian-date.pipe';
import { PersianTranslationPipe } from '../../pipes/persian-translation.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { Excercise } from '../../models/excercise.model';
import { MatSort } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  standalone: true,
  imports: [
    MaterialModule,
    DecimalPipe,
    PersianDatePipe,
    PersianTranslationPipe,
    FlexLayoutModule],
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css'
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'duration', 'calories', 'date', 'state'];
  finishedExcercises = new MatTableDataSource<Excercise>();
  private finishedExSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.finishedExSubscription = this.trainingService.finishedExChanged.subscribe((excercises: Excercise[]) => {
      this.finishedExcercises.data = excercises;
    });
    this.trainingService.fetchFinishedExcercises();
  }

  ngAfterViewInit(): void {
    this.finishedExcercises.sort = this.sort;
    this.finishedExcercises.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.finishedExSubscription.unsubscribe();
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finishedExcercises.filter = filterValue.trim().toLowerCase();
  }
}
