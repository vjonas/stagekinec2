import { Component, Input, Output, OnChanges, EventEmitter, AfterViewInit } from "@angular/core";
import { FullExercise } from "../../../models/full.exercise.model";
import { CompletedExercise } from "../../../models/completedExercise.model";
import { CompletedExerciseService } from "../../../services/completed-exercises.service";

@Component({
    selector: 'exerciseUser',
    templateUrl: 'user-exercise.component.html',
    styleUrls: ['./user-exercise.component.scss'],
})

export class UserExerciseComponent implements OnChanges {
    @Input() exercise: FullExercise = null;
    @Input() uid: string;
    @Input() selectedProgram: number;
    @Output() notify: EventEmitter<String> = new EventEmitter<String>();
    completedExerciseList: CompletedExercise[];
    showComponent: boolean = false;
    maxScore: number = 0;
    scoreList: number[] = new Array();
    latestScore: number = 0;
    latestScorePercentage: number = 0;
    highscore: number = 0;
    highscorePercentage: number = 0;
    averageScore: number = 0;
    averageScorePercentage: number = 0;

    constructor(private _completedExerciseService: CompletedExerciseService) {
    }

    ngOnChanges(changes) {
        if (changes.exercise != undefined && changes.exercise.currentValue != null) {
            this.showComponent = true;
            this.loadScores();
        }
    }

    private goBack() {
        this.maxScore = 0;
        this.latestScore = 0;
        this.highscore =0;
        this.averageScore = 0;
        this.latestScorePercentage =0;
        this.highscorePercentage =0;
        this.averageScorePercentage =0;
        this.showComponent = false;
        this.notify.emit("");
    }

    private loadScores() {
        this.exercise.steps.forEach(step =>console.log(this.maxScore += step.maxScore));
        this._completedExerciseService.getCompletedExercisesByUser(this.uid, this.selectedProgram, this.exercise['$key'])
            .subscribe(res => {
            this.completedExerciseList = res;
                this.calculateScores()
            });
    }

    private calculateScores() {
        var score = 0;
        this.completedExerciseList.forEach(ex => { ex.completedSteps.forEach(step => { score += step.score; this.scoreList.push(score) }); score = 0 });
        console.log(this.scoreList);
        this.scoreList.forEach(score => { if (this.highscore < score) { this.highscore = score } });
        this.completedExerciseList[0].completedSteps.forEach(step => this.latestScore += step.score);
        var totalScore = 0;
        this.scoreList.forEach(score => totalScore += score);
        this.averageScore = totalScore / this.scoreList.length;

        this.latestScorePercentage = Math.round((this.latestScore / this.maxScore) * 100);
        this.highscorePercentage = Math.round((this.highscore / this.maxScore) * 100);
        this.averageScorePercentage = Math.round((this.averageScore / this.maxScore) * 100);



    }
}

