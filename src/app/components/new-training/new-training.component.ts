import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AsyncPipe, NgFor } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { Excercise } from '../../models/excercise.model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, Subscription } from 'rxjs';
import { duration } from 'jalali-moment';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MaterialModule, FlexLayoutModule, NgFor, FormsModule, AsyncPipe],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Excercise[];
  exercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService, private firebaseDb: AngularFirestore) { }

  ngOnInit(): void {
    this.exercisesSubscription = this.trainingService.excercisesChanged.subscribe(exercises => { this.exercises = exercises });
    this.trainingService.fetchAvailableExcercises();
  }

  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe();
  }

  startTraining(form: NgForm) {
    this.trainingService.startExcercise(form.value.excercise);
  }
}
