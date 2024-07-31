import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-stop-training',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './stop-training.component.html',
  styleUrl: './stop-training.component.css'
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {

  }
}
