import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MaterialModule, FlexLayoutModule],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css'
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: any;
  @Output() dialogEvent = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.StartTraining();
  }

  private StartTraining() {
    const increment = (this.trainingService.getRunningExcercise().duration! / 100) * 1000;

    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExcercise();
        this.dialogEvent.emit();
        clearInterval(this.timer);
      }
    }, increment);
  }

  stop() {
    clearInterval(this.timer);
    const dialogref = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExcercise(this.progress);
        this.dialogEvent.emit();
      }
      else {
        this.StartTraining();
      }
    });
  }
}
