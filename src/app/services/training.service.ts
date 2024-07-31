import { Injectable } from '@angular/core';
import { Excercise } from '../models/excercise.model';
import { map, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanged = new Subject<Excercise | null>();
  excercisesChanged = new Subject<Excercise[]>();
  finishedExChanged = new Subject<Excercise[]>();
  private finishedExcercises: Excercise[] = [];
  private runningExcercise: Excercise | null;
  private availableExcercises: Excercise[] = [];

  constructor(private firebaseDb: AngularFirestore) { }

  fetchAvailableExcercises() {
    this.firebaseDb
      .collection('excercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: (doc.payload.doc.data() as any).name,
              duration: (doc.payload.doc.data() as any).duration,
              calories: (doc.payload.doc.data() as any).calories
            }
          })
        })
      )
      .subscribe((excercises: Excercise[]) => {
        this.availableExcercises = excercises;
        this.excercisesChanged.next([...this.availableExcercises]);
      });
  }

  startExcercise(selectedId: string) {
    this.runningExcercise =
      this.availableExcercises
        .find(ex => ex.id === selectedId)!;

    this.excerciseChanged.next({ ...this.runningExcercise });
  }

  getRunningExcercise() {
    return { ...this.runningExcercise };
  }

  completeExcercise() {
    this.addDataToDatabase({
      ...this.runningExcercise!,
      date: new Date(),
      state: 'completed'
    });

    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExcercise!,
      date: new Date(),
      state: 'canceled',
      duration: this.runningExcercise?.duration! * (progress / 100),
      calories: this.runningExcercise?.calories! * (progress / 100)
    });

    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  fetchFinishedExcercises() {
    this.firebaseDb.collection<Excercise>('finishedExcercises')
      .valueChanges()
      .subscribe((excercises: Excercise[]) => {
        this.finishedExChanged.next([...excercises]);
      });
  }

  private addDataToDatabase(excercise: Excercise) {
    this.firebaseDb.collection('finishedExcercises').add(excercise);
  }
}
