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
    @Input() private exercise: FullExercise = null;
    @Input() private uid: string;
    @Input() private selectedProgram: number;
    @Output() notify: EventEmitter<String> = new EventEmitter<String>();
    private dataLoaded = false;
    private completedExerciseList: CompletedExercise[] = new Array();
    private showComponent: boolean = false;
    private maxScore: number = 0;
    private scorePerCompleteExerciseList: number[] = new Array<number>();
    private latestScore: number = 0;
    private latestScorePercentage: number = 0;
    private highscore: number = 0;
    private highscorePercentage: number = 0;
    private averageScore: number = 0;
    private averageScorePercentage: number = 0;
    private CALIBRATION_STEP_NR: number = 0;

    constructor(private _completedExerciseService: CompletedExerciseService) {
    }

    ngOnChanges(changes) {
        if (changes.exercise != undefined && changes.exercise.currentValue != null) {
            this.showComponent = true;
            this.loadScores();
        }
    }

    private goBack() {
        this.resetScores();
        this.showComponent = false;
        this.notify.emit("");
    }

    private loadScores() {
        this.resetScores();
        this.exercise.steps.forEach(step => {
            if (step.stepNr > this.CALIBRATION_STEP_NR)
            { this.maxScore += step.maxScore; }
        });
        this._completedExerciseService.getCompletedExercisesByUser(this.uid, this.selectedProgram, this.exercise.exerciseId)
            .subscribe((completedExercise: CompletedExercise[]) => {
                this.completedExerciseList = completedExercise;
                this.calculateScores();
                this.dataLoaded =true;
            });
    }

    private calculateScores() {
        var scorePerExercise = 0;
        this.completedExerciseList.forEach((completedExercise: CompletedExercise) => {
            completedExercise.completedSteps.forEach(step => {
                if (step.stepNr > this.CALIBRATION_STEP_NR)
                { scorePerExercise += step.score; }
            });
            this.scorePerCompleteExerciseList.push(scorePerExercise);
            scorePerExercise = 0
        });
        this.scorePerCompleteExerciseList.forEach(score => { if (this.highscore < score) { this.highscore = score } });
        if(this.completedExerciseList.length != 0){
        this.completedExerciseList[this.completedExerciseList.length-1].completedSteps.forEach(step => this.latestScore += step.score);
        }
        var totalScore = 0;
        this.scorePerCompleteExerciseList.forEach(score => totalScore += score);
        console.log("totalscore:" + totalScore);
        console.log("scorelistlength:" + this.scorePerCompleteExerciseList.length);
        this.averageScore = Math.round(totalScore / this.scorePerCompleteExerciseList.length);
        this.highscore = Math.round(this.highscore);
        this.latestScore = Math.round(this.latestScore);

        this.latestScorePercentage = Math.round((this.latestScore / this.maxScore) * 100);
        this.highscorePercentage = Math.round((this.highscore / this.maxScore) * 100);
        this.averageScorePercentage = Math.round((this.averageScore / this.maxScore) * 100);
    }

    private resetScores() {
        this.maxScore = 0;
        this.latestScore = 0;
        this.highscore = 0;
        this.averageScore = 0;
        this.latestScorePercentage = 0;
        this.highscorePercentage = 0;
        this.averageScorePercentage = 0;
        this.scorePerCompleteExerciseList.length = 0;
        this.dataLoaded = false;
    }
}

