import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  private progress = 0;
  private timer: number;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
  	this.startOrResumeTimer();
  }

  startOrResumeTimer(){
	const step = (this.trainingService.getRunningExercise().duration / 10) * 1000;
	this.timer = setInterval(
		() => {
			this.progress = this.progress + 1;
			if(this.progress >= 100){
				this.trainingService.compoleteExercise();
				clearInterval(this.timer);
			}
		 }, 500
        );
  }
  onStop(){
	clearInterval(this.timer);
	const dialogRef = this.dialog.open(StopTrainingComponent, {
		data:{ 
			progress: this.progress
		}
	});
	dialogRef.afterClosed().subscribe(
		result => {
			if(result){
				this.trainingService.cancelExercise(this.progress);
			}
			else{
				this.startOrResumeTimer();
			}
		}
	);
  }

}
