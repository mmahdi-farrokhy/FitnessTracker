import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { NewTrainingComponent } from '../new-training/new-training.component';
import { PastTrainingComponent } from '../past-training/past-training.component';
import { CurrentTrainingComponent } from "../current-training/current-training.component";
import { NgIf } from '@angular/common';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MaterialModule, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent, NgIf],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {

  ongoingTraining: boolean = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.excerciseChanged.subscribe(excercise => {
      if (excercise) {
        this.ongoingTraining = true;
      }
      else {
        this.ongoingTraining = true;
      }
    });
  }

  startTraining() {
    this.ongoingTraining = true
  }
}
