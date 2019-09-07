import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService,
	      private db: AngularFirestore) { }

  ngOnInit() {
	//this.exercises = this.trainingService.getAvailableExercises();
	//this.db.collection('availableExercises').valueChanges().subscribe(
	//	result => {
	//		console.log(result);
	//	}
	//);
	//this.exercises = this.db.collection('availableExercises')
	//			.valueChanges();
	this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
		exercises => (this.exercises = exercises)
	);
	this.trainingService.fetchAvailableExercises();
	
  }
  onStartTraining(form: NgForm){
	this.trainingService.startExercise(form.value.exercise_);
  }
  ngOnDestroy(){
	this.exerciseSubscription.unsubscribe();
  }
}
 